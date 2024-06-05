interface Props {
  label: string;
}

export default function NoMovieFounded({ label }: Props) {
  return (
    <p className="mt-[2vw] text-center font-bold text-xl lg:text-2xl">
      {label}
    </p>
  );
}
