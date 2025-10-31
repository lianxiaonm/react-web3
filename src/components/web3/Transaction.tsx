import { useMemo, useState } from "react";
import { Button, Input } from "antd";
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
      <Input
        type="number"
        className="w-auto flex-1"
        defaultValue={number}
        onInput={onInput}
      />
      <Button
        type="primary"
        disabled={isPending}
        onClick={() =>
          sendTransaction({
            to: "0xd2135CfB216b74109775236E36d4b433F1DF507B",
            value: parseEther(`${number}`),
          })
        }
        children="Pay Ether"
      />
    </div>
  );
}
