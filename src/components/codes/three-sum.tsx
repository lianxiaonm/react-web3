import { useEffect, useState } from "react";
import { Button, Input } from "antd";

export const question = `
    题目: 给你一个整数数组 nums ，判断是否存在三元组 [nums[i], nums[j], nums[k]] 满足 i != j、i != k 且 j != k ,
    同时还满足 nums[i] + nums[j] + nums[k] == 0 。请你返回所有和为 0 且不重复的三元组。

    实例：
    * [-1,0,1,2,-1,-4] --> [[-1,-1,2],[-1,0,1]]
    * [0,1,1] --> []
    
    提示: 3 <= nums.length <= 3000, -105 <= nums[i] <= 105
`;

function threeSum(nums: number[]): number[][] {
  const ans = [];
  const len = nums ? nums.length : 0;
  nums = nums.sort((a, b) => a - b);
  for (let i = 0; i < len - 2; i++) {
    const curr = nums[i];
    if (curr > 0 || curr + nums[i + 1] > 0) break;
    if (i > 0 && nums[i] === nums[i - 1]) continue;
    let l = i + 1;
    let r = len - 1;
    while (l < r) {
      if (curr + nums[l] > 0) break;
      const sum = curr + nums[l] + nums[r];
      if (sum === 0) {
        ans.push([curr, nums[l], nums[r]]);
        while (l < r && nums[l] === nums[l + 1]) l++;
        while (l < r && nums[r] === nums[r - 1]) r--;
        l++;
        r--;
      } else if (sum < 0) l++;
      else if (sum > 0) r--;
    }
  }
  return ans;
}

export const Demo = () => {
  const [input, setInput] = useState("-1,0,1,2,-1,-4");
  const [output, setOutput] = useState<string>("");

  useEffect(() => setOutput(""), [input]);

  function execute() {
    const value = threeSum(input.split(",").map((num) => +num));
    setOutput(`${JSON.stringify(value)}`);
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
