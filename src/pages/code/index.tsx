import { history } from "umi";
import { useCallback } from "react";
import { useCode } from "./run";

const req = (require as any).context(
  "../../components/codes",
  false,
  /\.tsx$/i
);

const codes: Record<string, any> = {};
req.keys().forEach((key: string) => {
  const componentName = key.replace("./", "").replace(".tsx", "");
  if (/\//.test(componentName)) return;
  codes[componentName] = req(key);
});

export default function CodePage() {
  const [_, setCode] = useCode();
  const click = useCallback((key: string) => {
    const { question, Demo } = codes[key];
    setCode({ question, Demo });
    setTimeout(() => history.push("code/run"), 0);
  }, []);

  return (
    <ul className="h-full flex flex-col">
      {Object.keys(codes).map((key) => (
        <li
          key={key}
          children={key}
          onClick={() => click(key)}
          className="px-[24px] py-[16px] cursor-pointer border-b last-of-type:border-none"
        />
      ))}
    </ul>
  );
}
