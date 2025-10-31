import { atom, useAtom } from "jotai";

const marketTabAtom = atom("market");

export const marketTabs = [
    { label: "市场", key: "market" },
    { label: "信号", key: "signal" },
    { label: "牛人", key: "ranks" },
  ];

export const useMarketTab = () => useAtom(marketTabAtom);

const tradeTabAtom = atom("exchange");

export const tradeTabs = [
    { label: "兑换", key: "exchange" },
    { label: "跨链桥", key: "chainsTrade" },
    { label: "专业模式", key: "proTrade" },
  ];

export const useTradeTab = () => useAtom(tradeTabAtom);

const discoverTabAtom = atom("airdrop");

export const discoverTabs = [
  { label: "空投", key: "airdrop" },
  { label: "独家TGE", key: "exclusiveTge" },
  { label: "Booster", key: "booster" },
  { label: "Dapp", key: "dapp" },
];

export const useDiscoverTab = () => useAtom(discoverTabAtom);
