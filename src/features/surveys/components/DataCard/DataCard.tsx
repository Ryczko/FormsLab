interface DataCardProps {
  title: string;
  value: string;
}

export default function DataCard({ title, value }: DataCardProps) {
  return (
    <div className="m-1 w-full rounded-lg border border-zinc-200 bg-white py-2 px-4 shadow-md sm:w-1/2 md:w-[220px]">
      <h3 className="mb-1 font-semibold">{title}</h3>
      {value}
    </div>
  );
}
