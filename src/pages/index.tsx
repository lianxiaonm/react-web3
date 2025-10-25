import { Fragment, useEffect } from "react";
import { useAccount, useReconnect } from "wagmi";
import Search from "@/components/Search";
import Account from "@/components/Account";
import Entrance from "@/components/Entrance";
import Contract from "@/components/Contract";
import SignMessage from "@/components/SignMessage";
import Transaction from "@/components/Transaction";

export default function HomePage() {
  const { reconnect } = useReconnect();
  const { connector, isConnected, address } = useAccount();
  useEffect(() => {
    reconnect();
  }, []);

  return (
    <div className="h-screen p-[12px] flex flex-col gap-[12px] max-w-[440px] mx-auto">
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
