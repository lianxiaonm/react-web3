import { useLocation, Outlet, Link } from "umi";
import cls from "classnames";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { config } from "@/config";

const queryClient = new QueryClient();

const navigationLinks = [
  { name: "首页", url: "/web3" },
  { name: "市场", url: "/web3/market" },
  { name: "交易", url: "/web3/trade" },
  { name: "发现", url: "/web3/discover" },
  { name: "资产", url: "/web3/assets" },
];

export default function Web3Layout() {
  const location = useLocation();
  const pathname = location.pathname.replace(/\/$/, "");
  console.log("Current location:", location);
  return (
    <div className="section">
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <div className="flex-1 overflow-y-auto" children={<Outlet />} />
        </QueryClientProvider>
      </WagmiProvider>
      <div className="flex flex-none shadow-sm border-t border-gray-200 text-[14px]">
        {navigationLinks.map((link) => (
          <Link
            to={link.url}
            key={link.url}
            className={cls("flex-1 py-[10px] text-center", {
              "text-blue-500 font-medium": pathname === link.url,
              "text-gray-700": pathname !== link.url,
            })}
            children={link.name}
          />
        ))}
      </div>
    </div>
  );
}
