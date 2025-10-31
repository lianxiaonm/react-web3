type Props = {
  placeholder?: string;
};
export default function Search({ placeholder }: Props) {
  //
  return (
    <div className="p-2 rounded-[12px] bg-gray-50 text-gray-500">
      {placeholder || "搜索"}
    </div>
  );
}
