import Segmented from "@/components/Segmented";
import Market from "@/components/web3/market";
import Signal from "@/components/web3/market/Signal";
import Ranks from "@/components/web3/market/Ranks";

import { marketTabs, useMarketTab } from "@/jotai/web3";

export default function MarketPage() {
  const [topTab, setTopTab] = useMarketTab();
  return (
    <div className="h-full flex flex-col p-[12px] gap-[12px]">
      <Segmented options={marketTabs} value={topTab} onChange={setTopTab} />
      {topTab === "market" && <Market />}
      {topTab === "signal" && <Signal />}
      {topTab === "ranks" && <Ranks />}
    </div>
  );
}
