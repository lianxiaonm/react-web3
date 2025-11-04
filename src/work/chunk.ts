import SparkMD5 from "spark-md5";

onmessage = (evt) => {
  console.log("web work message", evt.data);
  const promise = evt.data.map((item: any) => {
    return new Promise((resolve) => {
      const { file, index, CHUCK_SIZE, name } = item;
      const start = index * CHUCK_SIZE;
      const end = start + CHUCK_SIZE;
      const md5 = new SparkMD5.ArrayBuffer();
      const fileReader = new FileReader();
      const blob = file.slice(start, end);
      fileReader.onload = (ev: any) => {
        md5.append(ev.target.result);
        resolve({ index, name, blob, hash: md5.end() });
      };
      fileReader.readAsArrayBuffer(blob);
    });
  });
  Promise.all(promise).then((results) => postMessage(results));
};
