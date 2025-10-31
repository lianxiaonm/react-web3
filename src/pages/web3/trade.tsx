import Segmented from "@/components/Segmented";
import Exchange from "@/components/web3/trade/Exchange";
import ChainTrade from "@/components/web3/trade/ChainTrade";
import ProTrade from "@/components/web3/trade/ProTrade";

import { tradeTabs, useTradeTab } from "@/jotai/web3";

export default function TradePage() {
  const [topTab, setTopTab] = useTradeTab();
  return (
    <div className="h-full flex flex-col p-[12px] gap-[12px]">
      <Segmented options={tradeTabs} value={topTab} onChange={setTopTab} />
      {topTab === "exchange" && <Exchange />}
      {topTab === "chainsTrade" && <ChainTrade />}
      {topTab === "proTrade" && <ProTrade />}
    </div>
  );
}
