import { useCallback, useRef, useState } from "react";
import { Button, Progress } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { throttle } from "lodash-es";
import { chunkFiles } from "@/utils/file";
import { xhrRequest } from "@/utils/http";

const fileAccept = [".png", ".svg", ".jpg", ".jpeg", ".webp"];

type State = {
  percent?: number;
  state: "init" | "upload" | "success" | "fail";
  cancel?: () => void;
  file: File;
};
//
export default function FilesPage() {
  const fileRef = useRef<any>(null);
  const [files, setFiles] = useState<State[]>([]);

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
      [...evt.target.files]
        .filter((item) => {
          const [suffix] = item.name.split(".").slice(-1);
          return fileAccept.indexOf(`.${suffix}`) > -1;
        })
        .map((file) => ({ percent: 0, file, state: "init" }))
    );
  }, []);

  const onUpload = useCallback(async () => {
    let temp: Record<string, any> = {};
    console.log("onUpload", files);
    const chunks = await chunkFiles(files.map((item) => item.file));
    console.log("upload chunks", chunks);
    // async temp to state
    const asyncState = throttle(() => {
      setFiles((pres) => {
        return pres.map((item) => {
          const {
            count,
            adapters = [],
            percents = [],
            states = [],
          } = temp[item.file.name] || {};
          let state: any = "init";
          let percent = (percents as number[]).reduce(
            (res, curr) => res + Math.round(curr / count),
            0
          );
          if ((states as boolean[]).indexOf(false) > -1) {
            state = "fail";
          } else if (percent === 100) {
            state = "success";
          } else if (percent === 0) {
            state = "init";
          } else {
            state = "upload";
          }
          return {
            file: item.file,
            state,
            percent,
            cancel: () => {
              (adapters as []).forEach((xhr: any) => xhr.cancel());
            },
          };
        });
      });
      //
    }, 100);

    chunks.map((chunk) => {
      const { name, index } = chunk;
      const formData = new FormData();
      formData.append("name", `${name}`);
      formData.append("index", `${index}`);
      formData.append("file", chunk.blob);

      temp[name] = temp[name] || { count: 0 };
      temp[name].count += 1;

      return xhrRequest("https://httpbin.org/post", {
        formData,
        adapter: (adapterParams) => {
          temp[name].adapters = temp[name].adapters || [];
          temp[name].adapters.push(adapterParams);
          asyncState();
        },
        onUploadProgress: (percent) => {
          temp[name].percents = temp[name].percents || [];
          temp[name].percents.push(percent);
          asyncState();
        },
      })
        .then(() => {
          temp[name].states = temp[name].states || [];
          temp[name].states.push(true);
          asyncState();
        })
        .catch(() => {
          temp[name].states = temp[name].states || [];
          temp[name].states.push(false);
          asyncState();
        });
    });
    console.log("onUpload chunks", chunks);
  }, [files]);

  const delImage = useCallback((index: number) => {
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

  const allSize = files.reduce((res, item) => res + item.file.size, 0);

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
      <div className="flex flex-col">
        {files.map(({ file, percent, state }, index) => (
          <div
            className="flex flex-col gap-1 border-b py-[12px] first-of-type:pt-0 last-of-type:border-none last-of-type:pb-0"
            key={file.webkitRelativePath || file.name}
          >
            <div className="flex items-center">
              <Progress
                percent={percent}
                className="w-[50%] mr-auto"
                status={state === "fail" ? "exception" : undefined}
              />
              <Button
                icon={<DeleteOutlined />}
                onClick={() => delImage(index)}
              />
            </div>
            <div className="flex">
              <label className="mr-auto" children="name" />
              <span children={file.webkitRelativePath || file.name} />
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
        ))}
      </div>
    </div>
  );
}
