import { useEffect, useMemo } from "react";
import { useAccount, useReconnect } from "wagmi";

import Entrance from "@/components/Entrance";
import Account from "@/components/web3/Account";


export default function Web3Page() {
  const { reconnect } = useReconnect();
  const { isConnected } = useAccount();
  useEffect(() => {
    isConnected || reconnect();
  }, []);

  const entraces = useMemo(() => {
    return [
      { text: "发送", key: "send" },
      { text: "接受", key: "revicer" },
      { text: "历史记录", key: "history" },
      { text: "授权", key: "auth" },
    ].map((item) => ({
      text: item.text,
      onClick: () => {},
    }));
  }, []);

  return (
    <div className="h-full flex flex-col p-[12px] gap-[12px]">
      <Account />
      <Entrance entraces={entraces} />
      {isConnected ? null : (
        <div className="p-2 rounded-[12px] bg-gray-50 text-gray-500 text-center">
          请先连接钱包
        </div>
      )}
    </div>
  );
}
