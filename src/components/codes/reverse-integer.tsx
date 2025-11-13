import { Button, Input } from "antd";
import { useEffect, useState } from "react";

export const question = `
    题目: 给你一个 32 位的有符号整数 x ，返回将 x 中的数字部分反转后的结果。如果反转后整数超过 32 位的有符号整数的范围 [−231,  231 − 1] ，就返回 0。

    实例：
    * x = 123 --> 321
    * x = -123 --> -321
    * x = 120 --> 21
    
    提示: -2^31 <= x <= 2^31 - 1
`;

const reverseInt = (x: number): number => {
  let rev = 0;
  while (x !== 0) {
    const digit = x % 10;
    x = ~~(x / 10);
    rev = rev * 10 + digit;
    if (rev < Math.pow(-2, 31) || rev > Math.pow(2, 31) - 1) {
      return 0;
    }
  }
  return rev;
};

export const Demo = () => {
  const [input, setInput] = useState("-120");
  const [output, setOutput] = useState<string>("");

  useEffect(() => setOutput(""), [input]);

  function execute() {
    const value = reverseInt(+input);
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
