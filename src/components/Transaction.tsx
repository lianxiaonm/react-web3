import { useMemo, useState } from "react";
import { useSendTransaction } from "wagmi";
import { parseEther } from "viem";

export default function Transaction() {
  const [number, setNumber] = useState(1);
  const { sendTransaction, data, isPending } = useSendTransaction();
  const onInput = useMemo(() => {
    let timer: any = null;
    return (e: any) => {
      if (timer) return;
      timer = setTimeout(() => {
        setNumber(e.target.value.replace(/\D/g, ""));
        timer = null;
      }, 200);
    };
  }, []);

  console.log("transaction", data, isPending);

  return (
    <div className="flex gap-[12px]">
      <input
        type="number"
        className="w-auto flex-1 border-none bg-gray-200 p-1 rounded-md"
        defaultValue={number}
        onInput={onInput}
      />
      <button
        className="px-2 bg-blue-500 text-white rounded disabled:opacity-50"
        disabled={isPending}
        onClick={() =>
          sendTransaction({
            to: "0xd2135CfB216b74109775236E36d4b433F1DF507B",
            value: parseEther(`${number}`),
          })
        }
        children="SendTra"
      />
    </div>
  );
}
