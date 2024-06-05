interface Props {
  label: string;
  value: string;
}
export default function UserInfo({ label, value }: Props) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-white/30 p-3 shadow-sm">
      <p className="text-sm lg:text-lg font-medium">{label}</p>
      <p className="truncate text-xs lg:text-base max-w-[200px] sm:max-w-[250px] lg:max-w-[300px] font-mono py-1 px-2 bg-slate-600 rounded-md">
        {value}
      </p>
    </div>
  );
}
