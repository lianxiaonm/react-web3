import { useCallback, useMemo, useRef, useState } from "react";
import { Button, Progress, Image, Spin } from "antd";
import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { throttle } from "lodash-es";
import { chunkFiles } from "@/utils/file";
import { xhrRequest } from "@/utils/http";

const fileAccept = [".png", ".svg", ".jpg", ".jpeg", ".webp"];

type Preview = { visible: boolean; source?: string };
type State = {
  percent?: number;
  state: "init" | "upload" | "success" | "fail";
  cancel?: () => void;
};
//
export default function FilesPage() {
  const fileRef = useRef<any>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [preview, setPreview] = useState<Preview>({ visible: false });
  const [uploadState, setUploadState] = useState<Record<string, State>>({});

  const loadFile = useCallback(() => {
    if (fileRef.current) {
      fileRef.current.value = "";
      fileRef.current.removeAttribute("directory");
      fileRef.current.removeAttribute("webkitdirectory");
      fileRef.current.setAttribute("multiple", true);
      fileRef.current.setAttribute("accept", fileAccept.join(","));
      fileRef.current.click();
    }
  }, []);
  const loadFolder = useCallback(() => {
    if (fileRef.current) {
      fileRef.current.value = "";
      fileRef.current.removeAttribute("multiple");
      fileRef.current.setAttribute("webkitdirectory", "");
      fileRef.current.setAttribute("directory", "");
      fileRef.current.click();
    }
  }, []);

  const fileChange = useCallback(async (evt: any) => {
    setFiles(
      [...evt.target.files].filter((item) => {
        const [suffix] = item.name.split(".").slice(-1);
        return fileAccept.indexOf(`.${suffix}`) > -1;
      })
    );
  }, []);

  const onUpload = useCallback(async () => {
    const chunks = await chunkFiles(files);
    console.log("upload chunks", chunks);

    files.map(async (file) => {
      const { webkitRelativePath } = file;
      const miniChunks = chunks.filter((chunk) =>
        webkitRelativePath
          ? webkitRelativePath === chunk.name
          : chunk.name === file.name
      );
      let state: State["state"] = "upload";
      let adapters: any[] = [];
      const percents: number[] = [];
      const cancel = () => adapters.map((adapter) => adapter?.cancel());

      const asyncState = throttle(() => {
        const key = webkitRelativePath || file.name;
        const percent = Math.round(
          percents.reduce((res, curr) => res + curr, 0) / miniChunks.length
        );
        setUploadState((preState) => ({
          ...preState,
          [key]: { percent, state, cancel },
        }));
      }, 50);

      try {
        await Promise.all(
          miniChunks.map((miniChunk) => {
            const { name, index } = miniChunk;
            const formData = new FormData();
            formData.append("name", `${name}`);
            formData.append("index", `${index}`);
            formData.append("file", miniChunk.blob);
            return xhrRequest("https://httpbin.org/post", {
              formData,
              adapter(adapterParam) {
                adapters[index] = adapterParam;
                asyncState();
              },
              onUploadProgress(percent) {
                percents[index] = percent;
                asyncState();
              },
            });
          })
        );
        state = "success";
      } catch (error) {
        state = "fail";
      } finally {
        adapters = [];
        asyncState();
      }
    });
  }, [files]);

  const viewImage = useMemo(() => {
    const cache = new Map<string, string>();
    return (img: File) => {
      const key = img.webkitRelativePath || img.name;
      const value = cache.get(key);
      Promise.resolve(
        value ||
          new Promise<string>((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.onload = (evt: any) => resolve(evt.target.result);
            fileReader.onerror = () => reject(new Error("file read error"));
            fileReader.readAsDataURL(img);
          })
      ).then((result) => {
        cache.set(key, result);
        setPreview({ visible: true, source: result });
      });
    };
  }, [files]);

  const delImage = useCallback((index: number, cancel: State["cancel"]) => {
    typeof cancel === "function" && cancel();
    setFiles((pres) => pres.filter((_, i) => index !== i));
  }, []);

  const transfer = useCallback((size: number) => {
    if (size > 1024 * 1024 * 1024) {
      return `${(size / 1024 / 1024 / 1024).toFixed(2)}GB`;
    } else if (size > 1024 * 1024) {
      return `${(size / 1024 / 1024).toFixed(2)}MB`;
    } else if (size > 1024) {
      return `${(size / 1024).toFixed(2)}KB`;
    }
    return `${size}B`;
  }, []);

  const allSize = files.reduce((res, item) => res + item.size, 0);

  return (
    <div className="section p-[12px] gap-[12px]">
      <input
        multiple
        type="file"
        ref={fileRef}
        className="hidden"
        accept={fileAccept.join(",")}
        onChange={fileChange}
      />
      <div className="flex justify-between">
        <Button type="primary" onClick={loadFile} children="select files" />
        <Button type="primary" onClick={loadFolder} children="select folder" />
      </div>
      <Button
        onClick={onUpload}
        disabled={!files.length}
        children={`upload files (${files.length}) (${transfer(allSize)})`}
      />
      <Image
        src=""
        className="hidden"
        preview={{
          src: preview.source,
          visible: preview.visible,
          onVisibleChange: (value) => {
            setPreview((pre) => ({ ...pre, visible: value }));
          },
        }}
      />
      <div className="flex flex-col">
        {files.map((file, index) => {
          const fileName = file.webkitRelativePath || file.name;
          const { percent = 0, state, cancel } = uploadState[fileName] || {};
          const isUpload = state === "upload";
          return (
            <div
              key={fileName}
              className="flex flex-col gap-1 border-b py-[12px] first-of-type:pt-0 last-of-type:border-none last-of-type:pb-0"
            >
              <div className="flex items-center">
                <Progress
                  className="w-[50%]"
                  status={state === "fail" ? "exception" : undefined}
                  percent={isUpload ? Math.min(99.9, percent) : percent}
                />
                {isUpload && <Spin className="ml-[8px]" size="small" />}
                <Button
                  className="m-auto mr-2"
                  icon={<EyeOutlined />}
                  onClick={() => viewImage(file)}
                />
                <Button
                  icon={<DeleteOutlined />}
                  onClick={() => delImage(index, cancel)}
                />
              </div>
              <div className="flex">
                <label className="mr-auto" children="name" />
                <span children={fileName} />
              </div>
              <div className="flex">
                <label className="mr-auto" children="type" />
                <span children={file.type} />
              </div>
              <div className="flex">
                <label className="mr-auto" children="size" />
                <span children={transfer(file.size)} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
