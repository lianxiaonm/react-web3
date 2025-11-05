const ErrorEnum = {
  10: "网络出错",
  11: "无权跨域",
  12: "网络出错",
  13: "超时",
  14: "解码失败",
  19: "HTTP 错误",
};

type AdapterParams = { cancel: () => void };

type XHROptions = {
  method?: string;
  params?: Record<string, any>;
  formData?: FormData;
  adapter?: (params: AdapterParams) => void;
  onUploadProgress?: (percent: number) => void;
  onProgress?: (percent: number) => void;
};
export const xhrRequest = async (url: string, options?: XHROptions) => {
  return new Promise<Record<string, any>>((resolve, reject) => {
    const {
      method = "GET",
      params,
      formData,
      adapter,
      onProgress,
      onUploadProgress,
    } = options || {};
    const xhr = new XMLHttpRequest();
    xhr.addEventListener("load", () => {
      if (xhr.status === 200) {
        try {
          resolve(JSON.parse(xhr.responseText));
        } catch (e) {
          reject(new Error(ErrorEnum[14]));
        }
      } else {
        reject(new Error(ErrorEnum[19]));
      }
    });
    xhr.addEventListener("error", () => reject(new Error("Network error")));
    if (typeof onProgress === "function") {
      xhr.addEventListener("progress", (event) => {
        console.log("XHR Download progress:", event.loaded, event.total);
        onProgress(Math.round((event.loaded / event.total) * 100));
      });
    }
    if (typeof onUploadProgress === "function") {
      xhr.upload.addEventListener("progress", (event) => {
        console.log("XHR Upload progress:", event.loaded, event.total);
        onUploadProgress(Math.round((event.loaded / event.total) * 100));
      });
    }
    if (formData instanceof FormData) {
      xhr.open("POST", url, true);
      adapter && adapter({ cancel: () => xhr.abort() });
      xhr.send(formData);
    } else {
      xhr.open(method, url, true);
      adapter && adapter({ cancel: () => xhr.abort() });
      xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      xhr.send(params ? JSON.stringify(params) : null);
    }
  });
};

type FetchOptions = {
  method?: string;
  body?: Record<string, any>;
  adapter?: (params: AdapterParams) => void;
  onProgress?: (percent: number) => void;
  maxCount?: number;
  onRetry?: (count: number) => void;
};
export const fetchRequest = async (
  url: string,
  options: FetchOptions
): Promise<Record<string, any>> => {
  const {
    method = "GET",
    body,
    adapter,
    onProgress,
    onRetry,
    maxCount = 0,
  } = options || {};
  try {
    const controller = new AbortController();
    adapter && adapter({ cancel: () => controller.abort() });
    const response = await fetch(url, {
      method,
      signal: controller.signal,
      body: body ? JSON.stringify(body) : null,
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    if (!response.body) throw new Error("ReadableStream not yet supported");
    const contentLength = response.headers.get("Content-Length");
    if (!contentLength) {
      throw new Error("Content-Length response header unavailable");
    }
    const total = parseInt(contentLength, 10);
    let loaded = 0;
    let result = "";
    const reader = response.body.getReader();
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      loaded += value?.length || 0;
      console.log("fetch progress:", loaded, total);
      result += new TextDecoder("utf-8").decode(value);
      onProgress && onProgress(Math.round((loaded / total) * 100));
    }
    return JSON.parse(result);
  } catch (error) {
    if (maxCount <= 0) throw error;
    onRetry && onRetry(maxCount);
    return fetchRequest(url, {
      method,
      body,
      onProgress,
      onRetry,
      maxCount: maxCount - 1,
    });
  }
};
