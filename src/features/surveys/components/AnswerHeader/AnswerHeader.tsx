import clsx from 'clsx';
import { BarChartData } from 'features/surveys/components/BarChart/BarChart';
import BarChart from 'features/surveys/components/BarChart/BarChart';
import DataCard from 'features/surveys/components/DataCard/DataCard';
import useTranslation from 'next-translate/useTranslation';

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
  const { t } = useTranslation('surveyAnswer');
  return (
    <div className="flex flex-col-reverse items-center justify-center md:flex-row">
      {chartData.length ? <BarChart data={chartData} /> : null}

      <div
        className={clsx(
          'mb-12 mt-6 flex w-full flex-col items-center justify-center md:my-0 md:ml-6 md:w-auto md:-translate-y-4',
          !chartData.length ? 'md:flex-row' : ''
        )}
      >
        <DataCard title={t('createDateInformation')} value={createDate} />
        <DataCard
          title={t('totalVotesInformation')}
          value={totalVotes.toString()}
        />
      </div>
    </div>
  );
}

export default AnswerHeader;
