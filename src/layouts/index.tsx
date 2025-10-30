import { Outlet } from "umi";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import dayjs from "dayjs";
import { ConfigProvider } from "antd";

import "dayjs/locale/zh-cn";
import zhCN from "antd/locale/zh_CN";

import { config } from "@/config";
import "./index.less";

dayjs.locale("zh-cn");

const queryClient = new QueryClient();

export default function Layout() {
  return (
    <ConfigProvider locale={zhCN}>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <Outlet />
        </QueryClientProvider>
      </WagmiProvider>
    </ConfigProvider>
  );
}
