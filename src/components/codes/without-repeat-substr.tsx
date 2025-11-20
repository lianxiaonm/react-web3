import { useEffect, useState } from "react";
import { Button, Input } from "antd";

export const question = `
    题目: 给定一个字符串 s ，请你找出其中不含有重复字符的 最长 子串 的长度。

    实例：
    * s = "abcabcbb" --> 3
    * s = "bbbbb" --> 1
    * s = 'pwwkew' --> 3
    
    提示: 0 <= s.length <= 5 * 10^4, s 由英文字母、数字、符号和空格组成
`;

function longSubstr(str: string): number {
  let ans = 0;
  const max = str.length;
  let arr: string[] = [];
  // 储存最长子串
  let result: string[] = [];
  for (let i = 0; i < max; i++) {
    const char = str.charAt(i);
    const idx = arr.indexOf(char);
    arr.splice(0, idx + 1); //
    arr.push(char);
    if (arr.length > ans) {
      result = [arr.join("")];
    } else if (arr.length === ans) {
      result.push(arr.join(""));
    }
    ans = Math.max(ans, arr.length);
  }
  console.log("所有最长子串", result);
  return ans;
}

export const Demo = () => {
  const [input, setInput] = useState("abcabcbb");
  const [output, setOutput] = useState<number>(0);

  useEffect(() => setOutput(0), [input]);

  function execute() {
    const value = longSubstr(input);
    setOutput(value);
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
