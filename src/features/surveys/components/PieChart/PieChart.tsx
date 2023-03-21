import { PieChart as Chart, Pie, Cell, ResponsiveContainer } from 'recharts';

const renderLabel = function (entry: { name: string; value: string | number }) {
  return `${entry.name} (${entry.value})`;
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export interface PieChartData {
  name: string;
  value: number;
}

interface PieChartProps {
  data: PieChartData[];
}

export default function PieChart({ data }: PieChartProps) {
  return data ? (
    <div className="mx-auto h-[250px] max-w-[300px]">
      <ResponsiveContainer width="100%">
        <Chart>
          <Pie
            isAnimationActive={true}
            animationDuration={600}
            dataKey="value"
            data={data}
            cx={135}
            cy={100}
            innerRadius={20}
            outerRadius={70}
            label={renderLabel}
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </Chart>
      </ResponsiveContainer>
    </div>
  ) : null;
}
