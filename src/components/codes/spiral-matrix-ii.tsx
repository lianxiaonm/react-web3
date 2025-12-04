import { useEffect, useState } from "react";
import { Button, Input } from "antd";

export const question = `
    题目: 给你一个正整数 n ，生成一个包含 1 到 n2 所有元素，且元素按顺时针顺序螺旋排列的 n x n 正方形矩阵 matrix

    实例：
    * n = 3 --> [[1,2,3],[8,9,4],[7,6,5]]
    * n = 1 --> [[1]]
    
    提示: 1 <= n <= 20
`;

const generateMatrix = (n: number): number[][] => {
  let ans = new Array(n).fill(0).map(() => new Array(n).fill(0));
  const last = n * n;
  let i = 0,
    round = 0,
    x = 0,
    y = 0,
    dir = "top";
  while (++i <= last) {
    ans[x][y] = i;
    const boundary = n - 1 - round;
    if (dir === "top") {
      if (y + 1 > boundary) {
        dir = "right";
        ++x;
      } else ++y;
    } else if (dir === "right") {
      if (x + 1 > boundary) {
        dir = "bottom";
        --y;
      } else ++x;
    } else if (dir === "bottom") {
      if (y - 1 < round) {
        dir = "left";
        --x;
      } else --y;
    } else if (dir === "left") {
      if (x - 1 < round + 1) {
        dir = "top";
        ++round;
        ++y;
      } else --x;
    }
  }
  return ans;
};

const generateMatrix1 = (n: number): number[][] => {
  let ans = new Array(n).fill(0).map(() => new Array(n).fill(0));
  let count = 1;
  let row = 0;
  let col = 0;
  let stepRow = 0;
  let stepCol = 1;
  const isBlock = () =>
    !ans[row + stepRow] || ans[row + stepRow][col + stepCol] !== 0;

  while (true) {
    ans[row][col] = count++;
    if (isBlock()) {
      if (stepRow === 0) {
        stepRow = stepCol;
        stepCol = 0;
      } else {
        stepCol = -stepRow;
        stepRow = 0;
      }
      if (isBlock()) break;
    }
    row += stepRow;
    col += stepCol;
  }

  return ans;
};

export const Demo = () => {
  const [input, setInput] = useState(3);
  const [output, setOutput] = useState<string>("");

  useEffect(() => setOutput(""), [input]);

  function execute() {
    const matrix = generateMatrix(+input);
    const matrix1 = generateMatrix1(+input);
    console.log("matrix", matrix, matrix1);
    setOutput(matrix.map((list) => list.join(", ")).join("<br/>"));
  }

  return (
    <div className="flex flex-col p-[8px] gap-[8px]">
      <div className="flex items-center">
        <Input
          defaultValue={input}
          className="h-[40px] mr-[12px]"
          onInput={(evt: any) => setInput(evt.target.value)}
        />
        <Button onClick={execute} className="h-[40px]" children="执行" />
      </div>
      <div className="flex">
        <div className="flex-none mr-[8px]" children="结果:" />
        <div dangerouslySetInnerHTML={{ __html: output }} />
      </div>
    </div>
  );
};
