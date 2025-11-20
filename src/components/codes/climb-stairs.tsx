import { useEffect, useState } from "react";
import { Button, Input } from "antd";

export const question = `
    题目: 假设你正在爬楼梯。需要 n 阶你才能到达楼顶。每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？
    
    实例：
    * n = 2 --> 2
    * n = 3 --> 3
    
    提示: 1 <= n <= 45
`;

const climb = (stairs: number): number => {
  if (stairs === 0) return 0;
  if (stairs === 1) return 1;
  if (stairs === 2) return 2;
  return climb(stairs - 1) + climb(stairs - 2);
};

export const Demo = () => {
  const [input, setInput] = useState(3);
  const [output, setOutput] = useState<number | "">("");

  useEffect(() => setOutput(""), [input]);

  function execute() {
    const value = climb(+input);
    console.log(input, "---", value);
    setOutput(value);
  }

  return (
    <div className="flex flex-col p-[8px] gap-[8px]">
      <div className="flex items-center">
        <Input
          type="number"
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
