import BarChart, { BarChartData } from '../BarChart/BarChart';
import DataCard from './DataCard/DataCard';

interface AnswerHeaderProps {
  totalVotes: number;
  startTime: string;
  chartData: BarChartData[];
}

function AnswerHeader({ totalVotes, startTime, chartData }: AnswerHeaderProps) {
  return (
    <div className="flex flex-col-reverse justify-center items-center md:flex-row">
      {chartData.length ? <BarChart data={chartData} /> : null}

      <div className="mb-12 mt-6 md:mb-0 md:mt-0 md:ml-6 flex flex-col items-center justify-center md:-translate-y-4">
        <DataCard title="Total Votes" value={totalVotes.toString()} />
        <DataCard title="Start time" value={startTime} />
      </div>
    </div>
  );
}

export default AnswerHeader;
