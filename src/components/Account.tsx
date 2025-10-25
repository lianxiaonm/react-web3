import { useEffect, useState } from "react";
import cls from "classnames";
import {
  useConnect,
  useDisconnect,
  useChainId,
  useSwitchChain,
  useEnsName,
  useBalance,
} from "wagmi";

type AccountProps = {
  connector?: any;
  isConnected: boolean;
  address: `0x${string}`;
};

const Account = ({ connector, isConnected, address }: AccountProps) => {
  const { connectors, connect } = useConnect();
  const { disconnect } = useDisconnect();
  const _chainId = useChainId();
  const { chains, switchChainAsync } = useSwitchChain();
  const chainId = _chainId || chains[0]?.id;
  const { data: ensName } = useEnsName({ address });
  const { data: balance } = useBalance({ address });

  console.log("balance", balance, chainId, ensName);

  return isConnected ? (
    <div className="flex gap-1 items-center">
      <div className="flex-1 items-center">
        <div className="font-bold">{connector?.name}</div>
        <div>
          {[balance?.value || `0.00`, balance?.symbol || "ETH"].join(" ")}
        </div>
      </div>
      <button
        className="border rounded-md px-[12px] py-[6px]"
        onClick={() => disconnect()}
        children="Disconnect"
      />
    </div>
  ) : (
    <div className="flex gap-2 items-center">
      <div className="flex-1">
        Choose Chains:
        <div className="flex gap-1 mt-1">
          {chains.map((c: any) => (
            <button
              key={c.id}
              className={cls(
                `border rounded-md px-[8px] py-[4px] text-[14px]`,
                {
                  "bg-blue-500 text-white": chainId === c.id,
                }
              )}
              onClick={() => switchChainAsync({ chainId: c.id })}
              children={c?.name}
            />
          ))}
        </div>
      </div>
      {connectors.map((c: any) => (
        <button
          key={c.id}
          className="border rounded-md px-[12px] py-[6px]"
          onClick={() => connect({ connector: c, chainId })}
          children={c.name}
        />
      ))}
    </div>
  );
};

export default Account;
