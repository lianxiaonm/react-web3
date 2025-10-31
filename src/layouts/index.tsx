import { Outlet } from "umi";
import { ConfigProvider } from "antd";
import dayjs from "dayjs";

import "dayjs/locale/zh-cn";
import zhCN from "antd/locale/zh_CN";

import "./index.less";

dayjs.locale("zh-cn");

export default function Layout() {
  return <ConfigProvider locale={zhCN} children={<Outlet />} />;
}
