import { Fragment, useState } from "react";
import Search from "@/components/Search";
import Segmented from "@/components/Segmented";
import XScroll from "@/components/XScroll";

export default function Market() {
  const memeList = "1".repeat(10).split("");
  const [tab, setTab] = useState("hot");

  const tabs = [
    { label: "自选", key: "my" },
    { label: "热门", key: "hot" },
    { label: "最新", key: "new" },
  ];
  return (
    <Fragment>
      <Search placeholder="代币名称或合约地址" />
      <XScroll>
        {memeList.map((_, index) => (
          <div
            key={index}
            className="border rounded-xl p-[6px] w-[80px] h-[80px] flex-none"
          />
        ))}
      </XScroll>
      <Segmented options={tabs} value={tab} onChange={setTab} />
    </Fragment>
  );
}
