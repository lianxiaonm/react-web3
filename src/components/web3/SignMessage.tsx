import { Button, Input } from "antd";
import { useMemo, useState } from "react";
import { useSignMessage } from "wagmi";

export default function SignMessage() {
  const [message, setMessage] = useState("Hello world");
  const { signMessage, data, isPending } = useSignMessage();
  const onInput = useMemo(() => {
    let timer: any = null;
    return (e: any) => {
      if (timer) return;
      timer = setTimeout(() => {
        setMessage(e.target.value);
        timer = null;
      }, 200);
    };
  }, []);

  console.log("sign message data", data, isPending);

  return (
    <div>
      <div className="flex gap-[12px]">
        <Input
          className="w-auto flex-1"
          defaultValue={message}
          onInput={onInput}
        />
        <Button
          type="primary"
          disabled={isPending}
          onClick={() => signMessage({ message })}
          children="Sign"
        />
      </div>
      <div className="mt-[12px] break-words">Sign Result: {data}</div>
    </div>
  );
}
