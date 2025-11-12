import { useLocation, Outlet, Link } from "umi";
import cls from "classnames";

const navigationLinks = [
  { name: "市场", url: "/code" },
  { name: "测试", url: "/code/run" },
];

export default function CodeLayout() {
  const location = useLocation();
  const pathname = location.pathname.replace(/\/$/, "");
  return (
    <div className="section">
      <div className="flex-1 overflow-y-auto" children={<Outlet />} />
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
