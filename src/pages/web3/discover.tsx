import Search from "@/components/Search";
import Segmented from "@/components/Segmented";
import Airdrop from "@/components/web3/discover/Airdrop";
import ExclusiveTge from "@/components/web3/discover/ExclusiveTge";
import Booster from "@/components/web3/discover/Booster";
import Dapp from "@/components/web3/discover/Dapp";

import { discoverTabs, useDiscoverTab } from "@/jotai/web3";

export default function DiscoverPage() {
  const [topTab, setTopTab] = useDiscoverTab();
  return (
    <div className="h-full flex flex-col p-[12px] gap-[12px]">
      <Segmented options={discoverTabs} value={topTab} onChange={setTopTab} />
      <Search placeholder="搜索Dapp或输入网址" />
      {topTab === "airdrop" && <Airdrop />}
      {topTab === "exclusiveTge" && <ExclusiveTge />}
      {topTab === "booster" && <Booster />}
      {topTab === "dapp" && <Dapp />}
    </div>
  );
}
