import { useEffect, useState } from "react";
import { Button, Input } from "antd";

export const question = `
    题目: 给你一个字符串数组，请你将 字母异位词 组合在一起。可以按任意顺序返回结果列表。

    实例：
    * strs = ["eat", "tea", "tan", "ate"] --> [["tan"],["ate","eat","tea"]]
    * strs = ["a"] --> [["a"]]
    
    提示: 1 <= strs.length <= 104, 0 <= strs[i].length <= 100
`;

const groupAnagrams = (strs: string[]): string[][] => {
  const map: Record<string, string[]> = {};
  for (let char of strs) {
    const key = char.split("").sort().join("");
    if (map[key]) map[key].push(char);
    else map[key] = [char];
  }
  return Object.values(map);
};

export const Demo = () => {
  const [input, setInput] = useState("eat,tea,tan,ate");
  const [output, setOutput] = useState<string>("");

  useEffect(() => setOutput(""), [input]);

  function execute() {
    const strs = input.split(",");
    const value = groupAnagrams(strs);
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
