import cls from "classnames";
type Props = {
  value: string;
  options: { key: string; label: any }[];
  onChange: (value: string) => void;
};
export default function Segmented({ value, options, onChange }: Props) {
  return (
    <div className="inline-flex gap-[16px]">
      {options.map((item) => (
        <div
          key={item.key}
          className={cls({
            "text-black font-bold": item.key === value,
            "text-gray-600": item.key !== value,
          })}
          onClick={() => onChange(item.key)}
          children={item.label}
        />
      ))}
    </div>
  );
}
