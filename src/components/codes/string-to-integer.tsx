import { Button, Input } from "antd";
import { useEffect, useState } from "react";

export const question = `
    题目: 请你来实现一个 myAtoi(string s) 函数，使其能将字符串转换成一个 32 位有符号整数。
    函数 myAtoi(string s) 的算法如下：
    * 空格: 读入字符串并丢弃无用的前导空格(" ")
    * 符号: 检查下一个字符（假设还未到字符末尾）为 '-' 还是 '+'。如果两者都不存在，则假定结果为正。
    * 转换: 通过跳过前置零来读取该整数, 直到遇到非数字字符或到达字符串的结尾。如果没有读取数字, 则结果为0。
    * 舍入: 小于 -2^31 的整数应该被舍入为 -2^31 ，大于 2^31 - 1 的整数应该被舍入为 2^31 - 1 。

    实例：
    * x = "42" --> 42
    * x = " -042" --> -42
    * x = "1337c0d3" --> 1337
    * x = "0-1" --> 0
    
    提示: 0 <= s.length <= 200, s 由英文字母(大写和小写)、数字(0-9)、' '、'+'、'-' 和 '.' 组成
`;

function myAtoi(s: string): number {
  let next = parseInt(s);
  if (isNaN(next)) next = 0;
  const max = Math.pow(2, 31) - 1;
  const min = Math.pow(-2, 31);
  return Math.max(Math.min(next, max), min);
}

function myAtoi1(s: string): number {
  const max = Math.pow(2, 31) - 1;
  const min = Math.pow(-2, 31);
  const next = +s.replace(/^(\s*)([-|\+]?\d*).*/, "$2").replace(/^(-|\+)$/, "");
  return Math.max(Math.min(next, max), min);
}

export const Demo = () => {
  const [input, setInput] = useState(" -042");
  const [output, setOutput] = useState<string>("");

  useEffect(() => setOutput(""), [input]);

  function execute() {
    const value = myAtoi1(input);
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
      <div className="">{`结果： ${output}`}</div>
    </div>
  );
};
