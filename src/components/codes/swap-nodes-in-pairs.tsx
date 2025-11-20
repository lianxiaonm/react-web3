import { useEffect, useState } from "react";
import { Button, Input } from "antd";

export const question = `
    题目: 给你一个链表，两两交换其中相邻的节点，并返回交换后链表的头节点。你必须在不修改节点内部的值的情况下完成本题（即，只能进行节点交换）。

    类型: INode = { val: number; next: INode } | null;

    实例：
    * head = [1,2,3,4] --> [2,1,4,3]
    * head = [1] --> [1]
    
    提示: 链表中节点的数目在范围 [0, 100] 内
`;

type INode = { val: number; next: INode } | null;

const arrToINode = (arr: number[]): INode => {
  return arr.reduceRight((res, val) => {
    return { val, next: res };
  }, null as INode);
};
const iNodeToArr = (node: INode): number[] => {
  const result: number[] = [];
  while (node) {
    result.push(+node.val);
    node = node.next;
  }
  return result;
};

// 1 - 2 - 3 - 4
function swapPairs(head: INode): INode {
  let tail, swap;
  const h = head?.next || head;
  //                                1       3
  while (head) {
    tail = head.next; //            2        4
    if (!tail) break;

    if (swap) swap.next = tail; //  null    2-1-4

    const tem = tail.next; //       3       null
    tail.next = head; //            2-1     4-3
    head.next = tem; //             2-1-3   4-3-null

    swap = head; //                 1

    // head move
    head = head.next; //            3       null
  }
  return h;
}

export const Demo = () => {
  const [input, setInput] = useState("1,2,3,4");
  const [output, setOutput] = useState<string>("");

  useEffect(() => setOutput(""), [input]);

  function execute() {
    const arr1 = input.split(",").map((num) => +num);
    const node1 = arrToINode(arr1);
    const node2 = swapPairs(node1);
    const arr2 = iNodeToArr(node2);
    setOutput(`${JSON.stringify(arr2)}`);
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
