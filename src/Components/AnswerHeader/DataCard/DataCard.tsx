type Props = {
  title: string;
  value: string;
};

export default function DataCard({ title, value }: Props) {
  return (
    <div className="px-6 m-1  py-2 w-[200px] bg-white rounded-lg border border-gray-200 shadow-md ">
      <h3 className="font-semibold mb-1">{title}</h3>
      {value}
    </div>
  );
}
