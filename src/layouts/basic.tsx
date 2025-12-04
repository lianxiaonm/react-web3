import { useLocation, Outlet, Link } from "umi";
import cls from "classnames";

const navigationLinks = [
  { name: "列表", uri: "" },
  { name: "测试", uri: "run" },
];

export default function BasicLayout() {
  const location = useLocation();
  const pathname = location.pathname.replace(/\/$/, "");
  const [prefix] = pathname.split("/").slice(1);
  return (
    <div className="section">
      <div className="flex-1 overflow-y-auto" children={<Outlet />} />
      <div className="flex flex-none shadow-sm border-t border-gray-200 text-[14px]">
        {navigationLinks.map((link) => {
          const url = [`/${prefix}`, link.uri].filter(Boolean).join("/");
          return (
            <Link
              to={url}
              key={url}
              className={cls("flex-1 py-[10px] text-center", {
                "text-blue-500 font-medium": pathname === url,
                "text-gray-700": pathname !== url,
              })}
              children={link.name}
            />
          );
        })}
      </div>
    </div>
  );
}
