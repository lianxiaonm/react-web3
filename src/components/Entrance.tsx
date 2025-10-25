type Props = {};

export default function Entrance(props: Props) {
  const entraces = [
    { name: "Alpha", href: "/alpha" },
    { name: "信号", href: "/signal" },
    { name: "理财", href: "/licai" },
    { name: "设置", href: "/settings" },
  ];

  return (
    <div className="flex gap-[22px] text-[14px]">
      {entraces.map((item) => (
        <a
          href={item.href}
          key={item.href}
          className="flex-1 flex flex-col gap-[6px]"
        >
          <div className="w-[44px] h-[44px] rounded-[12px] bg-gray-200 mx-auto" />
          <div className="text-center text-gray-700">{item.name}</div>
        </a>
      ))}
    </div>
  );
}
