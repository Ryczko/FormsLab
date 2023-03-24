import clsx from 'clsx';
import { BarChartData } from 'features/surveys/components/BarChart/BarChart';
import BarChart from 'features/surveys/components/BarChart/BarChart';
import DataCard from 'features/surveys/components/DataCard/DataCard';

interface AnswerHeaderProps {
  totalVotes: number;
  createDate: string;
  chartData: BarChartData[];
}

function AnswerHeader({
  totalVotes,
  createDate,
  chartData,
}: AnswerHeaderProps) {
  return (
    <div className="flex flex-col-reverse items-center justify-center md:flex-row">
      {chartData.length ? <BarChart data={chartData} /> : null}

      <div
        className={clsx(
          'mt-6 mb-12 flex w-full flex-col items-center justify-center md:my-0 md:ml-6 md:w-auto md:-translate-y-4',
          !chartData.length ? 'md:flex-row' : ''
        )}
      >
        <DataCard title="Create Date" value={createDate} />
        <DataCard title="Total Votes" value={totalVotes.toString()} />
      </div>
    </div>
  );
}

export default AnswerHeader;
