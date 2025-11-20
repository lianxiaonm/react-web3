import { useEffect, useState } from "react";
import { Button, Input } from "antd";

export const question = `
    题目: 给定一个长度为 n 的整数数组 height 。有 n 条垂线，第 i 条线的两个端点是 (i, 0) 和 (i, height[i]) 。
    找出其中的两条线，使得它们与 x 轴共同构成的容器可以容纳最多的水。
    返回容器可以储存的最大水量。

    实例：
    * [1,8,6,2,5,4,8,3,7] --> 49
    * [1,1] --> 1
    
    提示: n == height.length, 2 <= n <= 105, 0 <= height[i] <= 104
`;

function maxArea(h: string[]): number {
  let ans = 0;
  let l = 0,
    r = h.length - 1;
  while (l < r) {
    const lVal = +h[l];
    const rVal = +h[r];
    const area = (r - l) * Math.min(lVal, rVal);
    ans = Math.max(area, ans);
    if (lVal < rVal) l++;
    else r--;
  }
  return ans;
}

export const Demo = () => {
  const [input, setInput] = useState("1,8,6,2,5,4,8,3,7");
  const [output, setOutput] = useState<string>("");

  useEffect(() => setOutput(""), [input]);

  function execute() {
    const value = maxArea(input.split(","));
    setOutput(`${value}`);
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
        <div className="flex-none" children="结果:" />
        <div className="ml-[8px]" children={output} />
      </div>
    </div>
  );
};
