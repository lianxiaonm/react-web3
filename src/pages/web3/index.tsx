import { history } from "umi";
import { Fragment, useEffect, useMemo } from "react";
import { useAccount, useReconnect } from "wagmi";

import Search from "@/components/Search";
import Entrance from "@/components/Entrance";

import Account from "@/components/web3/Account";
import Contract from "@/components/web3/Contract";
import SignMessage from "@/components/web3/SignMessage";
import Transaction from "@/components/web3/Transaction";
import { useMarketTab } from "@/jotai/web3";

export default function Web3Page() {
  const [_, setMarketTab] = useMarketTab();
  const { reconnect } = useReconnect();
  const { isConnected } = useAccount();
  useEffect(() => {
    isConnected || reconnect();
  }, []);

  const entraces = useMemo(() => {
    return [
      { text: "Alpha", key: "alpha" },
      { text: "信号", key: "signal" },
      { text: "理财", key: "loan" },
      { text: "设置", key: "settings" },
    ].map((item) => ({
      text: item.text,
      onClick: () => {
        switch (item.key) {
          case "signal":
            setMarketTab("signal");
            return history.push("/web3/market");
        }
      },
    }));
  }, []);

  return (
    <div className="h-full flex flex-col p-[12px] gap-[12px]">
      <Search placeholder="搜索" />
      <Account />
      <Entrance entraces={entraces} />
      {isConnected ? (
        <Fragment>
          <Contract />
          <SignMessage />
          <Transaction />
        </Fragment>
      ) : (
        <div className="p-2 rounded-[12px] bg-gray-50 text-gray-500 text-center">
          请先连接钱包
        </div>
      )}
    </div>
  );
}
