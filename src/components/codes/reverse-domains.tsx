import { useEffect, useState } from "react";
import { Button, Input } from "antd";

export const question = `
    题目: domain reverse
    
    实例: 
    * 'api.binance.com' --> 'com.binance.api'
    
    要求:
    1.inplace
    2.cant use build-in func
    3.time & space O(1)
    
    提示: convert string to array first
`;

const reverseDomain = (domain: string) => {
  const arr: string[] = [];
  const max = domain.length - 1;
  // swap function
  const reverse = (l: number, r: number) => {
    while (l < r) {
      const temp = arr[l];
      arr[l++] = arr[r];
      arr[r--] = temp;
    }
  };
  let start = 0;
  for (let i = 0; i <= max; i++) {
    arr[i] = domain[max - i];
    if (arr[i] === ".") {
      reverse(start, i - 1);
      start = i + 1;
    } else if (i === max) {
      reverse(start, i);
    }
  }
  return arr.join("");
};

const reverseDomain1 = (domain: string) => {
  let result = "";
  let temp = "";
  for (let i = 0; i < domain.length; i++) {
    if (domain[i] === ".") {
      result = domain[i] + temp + result;
      temp = "";
    } else {
      temp += domain[i];
    }
  }
  return temp + result;
};

export const Demo = () => {
  const [input, setInput] = useState("api.binance.com.cn");
  const [output, setOutput] = useState("");

  useEffect(() => setOutput(""), [input]);

  function execute() {
    const domain = reverseDomain(input);
    const domain1 = reverseDomain1(input);
    console.log("output:", domain, "----", domain1);
    setOutput(domain);
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
      <div className="">{`结果: ${output}`}</div>
    </div>
  );
};
