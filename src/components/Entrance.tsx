type Props = {
  entraces: {
    icon?: string;
    text: string;
    onClick: () => void;
  }[];
};

export default function Entrance({ entraces }: Props) {
  return (
    <div className="flex gap-[22px] text-[14px]">
      {entraces.map((item) => (
        <a
          key={item.text}
          onClick={item.onClick}
          className="flex-1 flex flex-col gap-[6px]"
        >
          <div className="w-[44px] h-[44px] rounded-[12px] bg-gray-200 mx-auto" />
          <div className="text-center text-gray-700">{item.text}</div>
        </a>
      ))}
    </div>
  );
}
