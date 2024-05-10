interface DataCardProps {
  title: string;
  value: string;
}

export default function DataCard({ title, value }: DataCardProps) {
  return (
    <div className="w-full rounded-lg border bg-white px-4 py-2 shadow-sm">
      <h3 className="mb-1 font-semibold">{title}</h3>
      {value}
    </div>
  );
}
