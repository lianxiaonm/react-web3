import { Button } from "antd";
import {
  useConnect,
  useDisconnect,
  useChainId,
  useSwitchChain,
  useEnsName,
  useBalance,
  useAccount,
} from "wagmi";

const Account = () => {
  const { connector, isConnected, address } = useAccount();
  const { connectors, connect } = useConnect();
  const { disconnect } = useDisconnect();
  const _chainId = useChainId();
  const { chains, switchChainAsync } = useSwitchChain();
  const chainId = _chainId || chains[0]?.id;
  const { data: balance } = useBalance({ address });

  console.log("balance", balance, chainId);

  return isConnected ? (
    <div className="flex gap-1 items-center">
      <div className="flex-1 items-center">
        <div className="font-bold">{connector?.name}</div>
        <div>
          {[balance?.value || `0.00`, balance?.symbol || "ETH"].join(" ")}
        </div>
      </div>
      <Button
        type="default"
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
            <Button
              key={c.id}
              type={chainId === c.id ? "primary" : "default"}
              onClick={() => switchChainAsync({ chainId: c.id })}
              children={c?.name}
            />
          ))}
        </div>
      </div>
      {connectors.map((c: any) => (
        <Button
          key={c.id}
          type="default"
          onClick={() => connect({ connector: c, chainId })}
          children={c.name}
        />
      ))}
    </div>
  );
};

export default Account;
