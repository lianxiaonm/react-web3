import { useCallback, useState } from "react";
import { Button, message, Progress } from "antd";

import { xhrRequest, fetchRequest } from "@/utils/http";

const bigList = Array.from({ length: 50000 }, (_, i) =>
  `${i}`.padStart(9, "X")
);

export default function HttpPage() {
  const [messageApi, contextHolder] = message.useMessage();
  const [result, setResult] = useState("");
  const [progress, setProgress] = useState(0);
  const [retryCount, setRetryCount] = useState(0);
  const [type, setType] = useState<
    "" | "xhr" | "xhr-upload" | "fetch" | "fetch-max"
  >("");

  const reset = useCallback((err?: any) => {
    setType("");
    setProgress(0);
    setRetryCount(0);
    err && messageApi.error("Request failed: " + err.message);
  }, []);

  const handleXhr = useCallback(async () => {
    let timoutId: any = 0;
    setType("xhr-upload");
    xhrRequest("https://httpbin.org/post", {
      method: "POST",
      params: { name: "Umi", framework: "React", list: bigList },
      onUploadProgress: (percent) => {
        setProgress(percent);
        if (percent >= 100) {
          timoutId = setTimeout(() => {
            setType("xhr");
            setProgress(0);
            timoutId = null;
          }, 300);
        }
      },
      onProgress: (percent) => {
        if (timoutId) clearTimeout(timoutId);
        setType("xhr");
        setProgress(percent);
        if (percent >= 100) setTimeout(reset, 250);
      },
    })
      .then((res) => setResult(res.data))
      .catch((err) => {
        setTimeout(() => reset(err), 100);
        if (timoutId) clearTimeout(timoutId);
      });
  }, []);

  const handleFetch = useCallback(async () => {
    setType("fetch");
    fetchRequest("https://httpbin.org/post", {
      method: "POST",
      body: { name: "Umi", framework: "React", list: bigList },
      onProgress: (percent) => {
        setProgress(percent);
        if (percent >= 100) setTimeout(reset, 250);
      },
    })
      .then((res) => setResult(res.data))
      .catch(reset);
  }, []);

  const handleFetchMaxRetry = useCallback(async () => {
    setType("fetch-max");
    fetchRequest("https://httpbin.org/status/500", {
      maxCount: 3,
      onRetry: (count) => setRetryCount(count),
    }).catch(reset);
  }, []);

  return (
    <div className="section p-[12px] gap-[12px]">
      {contextHolder}
      <Button type="primary" onClick={handleXhr} disabled={!!type}>
        XHR progress
      </Button>
      <Button type="default" onClick={handleFetch} disabled={!!type}>
        Fetch progress
      </Button>
      <Button type="default" onClick={handleFetchMaxRetry}>
        Fetch Max Retry
      </Button>
      <div className="text-[12px]">
        Result:
        <code className="block break-all max-h-[50vh] overflow-auto">
          {result}
        </code>
      </div>
      {type && (
        <div className="flex fixed inset-0 justify-center items-center bg-black bg-opacity-10">
          {type === "fetch-max" ? (
            <div className="w-[200px] p-[24px] bg-white rounded-[12px] text-center">
              <div>{retryCount ? `Retrying..${retryCount}` : "Fetch..."}</div>
            </div>
          ) : (
            <div className="w-[200px] p-[24px] bg-white rounded-[12px] text-center">
              {progress ? (
                <Progress percent={progress} showInfo={false} />
              ) : null}
              <div>{progress ? `${progress}%` : `${type} Loading...`}</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
