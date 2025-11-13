import { Button, Input } from "antd";
import { useEffect, useState } from "react";

export const question = `
    题目: 给你一个字符串 s, 找到 s 中最长的 回文 子串。

    实例：
    * s = "babad" --> 'bab'
    * s = "cbbd" --> 'bb'
    
    提示: 1 <= s.length <= 1000, s 由英文字母、数字组成
`;

const findIdxs = (str: string, char: string) => {
  let idxs = [];
  for (let i = 0; i < str.length - 1; i++) {
    if (str[i] === char) idxs.push(i);
  }
  return idxs;
};

const longestPalindrome = (str: string) => {
  let max = 0;
  let last = str.length;
  let result: string[] = [];
  while (--last >= 0) {
    const char = str.charAt(last);
    const _str = str.substring(0, last + 1);
    findIdxs(_str, char).forEach((idx) => {
      let l = idx;
      let r = last;

      if (r - l + 1 < max) return;
      while (++l < --r) {
        if (str[l] !== str[r]) return;
      }

      const subStr = str.substring(idx, last + 1);
      if (subStr.length === max) {
        result.unshift(subStr);
      } else if (subStr.length > max) {
        result = [subStr];
      }
      max = Math.max(max, subStr.length);
    });
  }
  console.log("最长回文子串:", result);
  return result.length ? result[0] : str[0];
};

export const Demo = () => {
  const [input, setInput] = useState("babad");
  const [output, setOutput] = useState<string>("");

  useEffect(() => setOutput(""), [input]);

  function execute() {
    const value = longestPalindrome(input);
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
      <div className="">{`结果： ${output}`}</div>
    </div>
  );
};
