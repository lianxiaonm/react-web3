const CHUCK_SIZE = 1024 * 1024 * 2;

type Chunk = { name: string; blob: Blob; hash: string; index: number };

export const chunkFiles = (files: File[]) => {
  // 把所有文件计算好分片
  const chunks = files.reduce((result, file) => {
    const chunkCount = Math.ceil(file.size / CHUCK_SIZE);
    const list = "a".repeat(chunkCount).split("");
    return result.concat(
      list.map((_, index) => ({
        file,
        index,
        CHUCK_SIZE,
        name: file.webkitRelativePath || file.name,
      }))
    );
  }, [] as any[]);
  const THREAD_COUNT = Math.min(
    chunks.length,
    navigator.hardwareConcurrency || 4
  );
  let count = 0;
  let works = [];
  const result: Chunk[][] = [];

  for (let i = 0; i < THREAD_COUNT; i++) {
    const workChunks = chunks.filter((_, index) => index % THREAD_COUNT === i);
    if (workChunks.length > 0) works.push(workChunks);
  }

  return new Promise<Chunk[]>((resolve) => {
    works.forEach((workFiles, i) => {
      const work = new Worker(new URL("../work/chunk.ts", import.meta.url), {
        type: "module",
      });
      work.postMessage(workFiles);
      work.onmessage = (evt) => {
        result[i] = evt.data;
        work.terminate();
        if (++count == THREAD_COUNT) {
          resolve(result.reduce((res, curr) => res.concat(curr), []));
        }
      };
    });
  });
};
