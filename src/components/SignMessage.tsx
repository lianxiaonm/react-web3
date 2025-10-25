import { useMemo, useState } from "react";
import { useSignMessage, useVerifyMessage } from "wagmi";

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
        <input
          className="w-auto flex-1 border-none bg-gray-200 p-1 rounded-md"
          defaultValue={message}
          onInput={onInput}
        />
        <button
          className="px-2 bg-blue-500 text-white rounded disabled:opacity-50"
          disabled={isPending}
          onClick={() => signMessage({ message })}
          children="Sign"
        />
      </div>
      <div className="mt-[12px] break-words">Sign Result: {data}</div>
    </div>
  );
}
