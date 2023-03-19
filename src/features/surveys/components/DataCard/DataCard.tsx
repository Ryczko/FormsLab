interface DataCardProps {
  title: string;
  value: string;
}

export default function DataCard({ title, value }: DataCardProps) {
  return (
    <div className="py-2 px-6 m-1 w-[200px] bg-white rounded-lg border border-zinc-200 shadow-md">
      <h3 className="mb-1 font-semibold">{title}</h3>
      {value}
    </div>
  );
}
