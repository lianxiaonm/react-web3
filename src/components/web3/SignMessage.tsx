import { useCallback, useMemo, useState } from "react";
import { useAccount, useSignMessage, useVerifyMessage } from "wagmi";
import { Button, Input, message as andMessage, Spin } from "antd";

type Props = {
  message: string;
  signature: `0x${string}`;
};
const VerifyMessage = ({ message, signature }: Props) => {
  const { address } = useAccount();
  const { data, isPending } = useVerifyMessage({ address, message, signature });
  console.log("verify message data", data, isPending);

  return <div>{isPending ? <Spin /> : data ? "success" : "fail"}</div>;
};

export default function SignMessage() {
  const [check, setCheck] = useState(false);
  const [message, setMessage] = useState("Hello world");
  const { signMessage, data, isPending } = useSignMessage();
  const onInput = useMemo(() => {
    let timer: any = null;
    return (e: any) => {
      if (timer) return;
      timer = setTimeout(() => {
        setCheck(false)
        setMessage(e.target.value);
        timer = null;
      }, 200);
    };
  }, []);

  const doSignature = useCallback(() => {
    try {
      setCheck(false);
      signMessage({ message });
    } catch (error: any) {
      andMessage.error(`Signature failed: ${error.message}`);
    }
  }, [message]);

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
          onClick={doSignature}
          children="Sign"
        />
      </div>
      <div className="my-[8px] break-words">Sign Result: {data}</div>
      <div className="flex gap-[12px]">
        <Button
          type="primary"
          className="mr-auto"
          onClick={() => setCheck(true)}
          children="verify"
        />
        {check && <VerifyMessage message={message} signature={data} />}
      </div>
    </div>
  );
}
