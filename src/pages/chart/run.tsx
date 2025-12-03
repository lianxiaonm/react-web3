import { atom, useAtom } from "jotai";
import Markdown from "react-markdown";

const runAtom = atom({
  description: `
    功能: 
  `,
  Chart: () => null,
});

export const useRun = () => useAtom(runAtom);

export default function RunPage() {
  const [{ description, Chart }] = useRun();
  return (
    <div className="h-full">
      <div className="bg-gray-200 with-markdown">
        <Markdown children={description} />
      </div>
      <Chart />
    </div>
  );
}
