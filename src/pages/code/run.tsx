import { Fragment } from "react";
import { atom, useAtom } from "jotai";
import Markdown from "react-markdown";

const codeAtom = atom({
  question: `
    题目: xxxx
    
    实例: input --> output
    
    要求：
    1. 条件一
    
    提示：
  `,
  Demo: Fragment,
});

export const useCode = () => useAtom(codeAtom);

export default function RunPage() {
  const [{ question, Demo }] = useCode();
  return (
    <div className="h-full">
      <div className="bg-gray-200 with-markdown">
        <Markdown children={question} />
      </div>
      <Demo />
    </div>
  );
}
