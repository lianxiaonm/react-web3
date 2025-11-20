import { useEffect, useState } from "react";
import { Button, Input } from "antd";

export const question = `
    题目: 给你一个未排序的整数数组 nums ，请你找出其中没有出现的最小的正整数。
    请你实现时间复杂度为 O(n) 并且只使用常数级别额外空间的解决方案。

    实例：
    * nums = [1,2,0] --> 3
    * nums = [3,4,-1,1] --> 1
    
    提示: 1 <= nums.length <= 105, -231 <= nums[i] <= 231 - 1
`;

const firstMissingPositive = (nums: number[]): number => {
  const arr = new Array(nums.length);
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] > 0) arr[nums[i]] = nums[i];
  }
  let ans = 1;
  for (; ans < arr.length; ans++) {
    if (!arr[ans]) break;
  }
  return ans;
};

export const Demo = () => {
  const [input, setInput] = useState("1,2,0");
  const [output, setOutput] = useState<string>("");

  useEffect(() => setOutput(""), [input]);

  function execute() {
    const nums = input.split(",").map((num) => +num);
    const value = firstMissingPositive(nums);
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
