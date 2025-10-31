import { Button } from "antd";
import {
  useDeployContract,
  useReadContract,
  useWriteContract,
} from "wagmi";
import { balanceAbi, approveAbi } from "@/abi";

export default function Contract() {
  const { data } = useReadContract({
    abi: balanceAbi,
    address: "0x6b175474e89094c44da98b954eedeac495271d0f",
    functionName: "totalSupply",
  });
  const {
    deployContract,
    data: deployData,
    isPending: deployPending,
  } = useDeployContract();
  const {
    writeContract,
    data: writeData,
    isPending: writePending,
  } = useWriteContract();

  console.log("Contract", deployData, deployPending, writeData, writePending);

  function handlerDeploy() {
    deployContract({
      abi: approveAbi,
      args: [],
      bytecode:
        "0x608060405234801561001057600080fd5b5060405161010038038061010083398101604090815281516020808401518383015190602001850151906020018051906020019092919050505080600081905550506100f88061006d6000396000f3fe608060405260043610601f5760003560e01c806370a08231146024578063a9059cbb14604e575b600080fd5b348015602f57600080fd5b506036606e565b6040518082815260200191505060405180910390f35b348015605957600080fd5b5060606078565b005b60005481565b60008054905090565b600081359050609381609f565b",
    });
  }

  function handleWrite() {
    writeContract({
      abi: approveAbi,
      address: "0x6b175474e89094c44da98b954eedeac495271d0f",
      functionName: "transferFrom",
      args: [
        "0xd2135CfB216b74109775236E36d4b433F1DF507B",
        "0xA0Cf798816D4b9b9866b5330EEa46a18382f251e",
        123n,
      ],
    });
  }

  return (
    <div>
      <div className="mb-[8px]">Read Contract: {data?.toString() || "0"}</div>
      <div className="flex items-center justify-between text-[14px]">
        <Button
          type="default"
          disabled={deployPending}
          onClick={handlerDeploy}
          children="Deployed Contract"
        />
        <Button
          type="primary"
          disabled={writePending}
          onClick={handleWrite}
          children="Write Contract"
        />
      </div>
    </div>
  );
}
