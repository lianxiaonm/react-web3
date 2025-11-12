import { Button, Input } from "antd";
import { useEffect, useState } from "react";

export const question = `
    题目: 给你两个 非空 的链表，表示两个非负的整数。它们每位数字都是按照 逆序 的方式存储的，并且每个节点只能存储 一位 数字。
    请你将两个数相加，并以相同形式返回一个表示和的链表。

    类型: INode = { val: number; next: INode } | null;

    实例：
    * l1 = [2,4,3], l2 = [5,6,4] --> [7,0,8]
    
    提示: 这两个数都不会以 0 开头。
`;

type INode = { val: number; next: INode } | null;

const arrToINode = (arr: number[]): INode => {
  return arr.reduceRight((res, val) => {
    return res ? { val, next: res } : { val, next: null };
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

const addTwoNumbers = function (l1: INode, l2: INode) {
  let i = -1;
  let carry = 0;
  const arr1 = iNodeToArr(l1);
  const arr2 = iNodeToArr(l2);
  const arr3: number[] = [];
  const max = Math.max(arr1.length, arr2.length);
  while (++i < max) {
    const v1 = arr1[i] || 0;
    const v2 = arr2[i] || 0;
    const sum = v1 + v2 + carry;
    carry = Math.floor(sum / 10);
    arr3.push(sum % 10);
  }
  if (carry > 0) arr3.push(carry);

  return arrToINode(arr3);
};

const addTwoNumbers1 = function (l1: INode, l2: INode) {
  let carry = 0;
  let head: INode = null;
  let tail: INode = null;
  while (l1 || l2) {
    const v1 = l1 ? l1.val : 0;
    const v2 = l2 ? l2.val : 0;
    const sum = v1 + v2 + carry;
    carry = Math.floor(sum / 10);
    if (!head || !tail) {
      head = tail = { val: sum % 10, next: null };
    } else {
      tail.next = { val: sum % 10, next: null };
      tail = tail.next;
    }
    if (l1) l1 = l1.next;
    if (l2) l2 = l2.next;
  }
  if (carry > 0 && tail) tail.next = { val: carry, next: null };
  return head;
};

export const Demo = () => {
  const [arr1, setArr1] = useState([2, 4, 3]);
  const [arr2, setArr2] = useState([5, 6, 4]);
  const [output, setOutput] = useState<number[] | null>(null);

  useEffect(() => setOutput(null), [arr1, arr2]);

  function execute() {
    const node1 = arrToINode(arr1);
    const node2 = arrToINode(arr2);
    const node3 = addTwoNumbers(node1, node2);
    console.log("output:", node3);
    setOutput(iNodeToArr(node3));
  }

  return (
    <div className="flex flex-col p-[8px] gap-[8px]">
      <div className="flex items-center">
        <Input
          defaultValue={arr1.join(",")}
          onInput={(ev: any) => setArr1(ev.target.value.split(","))}
        />
        <Input
          className="mx-[8px]"
          defaultValue={arr2.join(",")}
          onInput={(ev: any) => setArr2(ev.target.value.split(","))}
        />
        <Button onClick={execute} className="h-[40px]" children="执行" />
      </div>
      <div className="">{`结果： ${JSON.stringify(output)}`}</div>
    </div>
  );
};
