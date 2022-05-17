import clsx from 'clsx';
import BarChart, { BarChartData } from '../BarChart';
import DataCard from '../DataCard';

interface AnswerHeaderProps {
  totalVotes: number;
  startDate: string;
  endDate: string;
  chartData: BarChartData[];
}

function AnswerHeader({
  totalVotes,
  startDate,
  endDate,
  chartData,
}: AnswerHeaderProps) {
  return (
    <div className="flex flex-col-reverse justify-center items-center md:flex-row">
      {chartData.length ? <BarChart data={chartData} /> : null}

      <div
        className={clsx(
          'mb-12 mt-6 md:mb-0 md:mt-0 md:ml-6 flex flex-col items-center justify-center md:-translate-y-4',
          !chartData.length ? 'md:flex-row' : ''
        )}
      >
        <DataCard title="Total Votes" value={totalVotes.toString()} />
        <DataCard title="Start Date" value={startDate} />
        <DataCard title="End Date" value={endDate} />
      </div>
    </div>
  );
}

export default AnswerHeader;
