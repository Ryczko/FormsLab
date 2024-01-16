import DataCard from 'features/surveys/features/SurveyResults/components/DataCard/DataCard';
import useTranslation from 'next-translate/useTranslation';
import { formatDate } from 'shared/utilities/convertTime';

interface AnswerHeaderProps {
  totalVotes: number;
  createDate: string | Date;
}

function AnswerHeader({ totalVotes, createDate }: AnswerHeaderProps) {
  const { t } = useTranslation('surveyAnswer');
  return (
    <div className={'my-6 flex flex-col gap-2 md:flex-row'}>
      <DataCard
        title={t('createDateInformation')}
        value={formatDate(createDate)}
      />
      <DataCard
        title={t('totalVotesInformation')}
        value={totalVotes.toString()}
      />
    </div>
  );
}

export default AnswerHeader;
