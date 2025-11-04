import { useCallback } from "react";
import { Button, message, Segmented } from "antd";
import { DisconnectOutlined, CopyOutlined } from "@ant-design/icons";
import {
  useConnect,
  useChainId,
  useSwitchChain,
  useBalance,
  useAccount,
} from "wagmi";

const Account = () => {
  const { connector, isConnected, address } = useAccount();
  const { connectors, connect } = useConnect();
  const _chainId = useChainId();
  const { chains, switchChainAsync } = useSwitchChain();
  const chainId = _chainId || chains[0]?.id;
  const { data: balance } = useBalance({ address });

  const copyAddress = useCallback(() => {
    try {
      navigator.clipboard.writeText(address);
      message.success("copy success");
    } catch (error: any) {
      message.error(`copy error: ${error.message}`);
    }
  }, [address]);

  console.log("balance", balance, chainId);

  return (
    <div className="flex flex-col gap-2">
      <Segmented
        block
        value={chainId}
        options={chains.map((c: any) => ({ value: c.id, label: c.name }))}
        onChange={(value) => switchChainAsync({ chainId: value })}
      />
      {isConnected ? (
        <div className="flex gap-1 items-center">
          <div className="items-center mr-auto">
            <div className="flex gap-2 items-end">
              <span className="font-bold">{connector?.name}</span>
              <span className="text-[14px]">
                {address.replace(/^(.{4}).*(.{4})$/, "$1...$2")}
              </span>
            </div>
            <div>
              {[balance?.value || `0.00`, balance?.symbol || "ETH"].join(" ")}
            </div>
          </div>
          <Button icon={<CopyOutlined />} onClick={copyAddress} />
          <Button
            icon={<DisconnectOutlined />}
            onClick={() => connector?.disconnect()}
          />
        </div>
      ) : (
        <div className="flex gap-2 items-center">
          Connect Wallet:
          {connectors.map((c: any, index: number) => (
            <Button
              key={c.id}
              className={index ? "" : "ml-auto"}
              onClick={() => connect({ connector: c, chainId })}
              children={c.name}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Account;
