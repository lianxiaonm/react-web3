import { Fragment, useEffect } from "react";
import { useAccount, useReconnect } from "wagmi";
import Search from "@/components/Search";
import Account from "@/components/Account";
import Entrance from "@/components/Entrance";
import Contract from "@/components/Contract";
import SignMessage from "@/components/SignMessage";
import Transaction from "@/components/Transaction";

export default function Web3Page() {
  const { reconnect } = useReconnect();
  const { connector, isConnected, address } = useAccount();
  useEffect(() => {
    reconnect();
  }, []);

  return (
    <div className="section p-[12px] gap-[12px]">
      <Search />
      <Account
        address={address}
        connector={connector}
        isConnected={isConnected}
      />
      {isConnected ? (
        <Fragment>
          <Entrance />
          <Contract address={address} />
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
