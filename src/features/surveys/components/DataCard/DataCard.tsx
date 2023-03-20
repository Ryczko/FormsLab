interface DataCardProps {
  title: string;
  value: string;
}

export default function DataCard({ title, value }: DataCardProps) {
  return (
    <div className="m-1 w-[200px] rounded-lg border border-zinc-200 bg-white py-2 px-6 shadow-md">
      <h3 className="mb-1 font-semibold">{title}</h3>
      {value}
    </div>
  );
}
