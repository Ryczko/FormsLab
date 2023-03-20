import { LinkIcon, RefreshIcon } from '@heroicons/react/outline';
import Head from 'next/head';
import withAnimation from '../../../../shared/HOC/withAnimation';
import withProtectedRoute from '../../../../shared/HOC/withProtectedRoute';
import AnswerHeader from 'src/features/surveys/components/AnswerHeader/AnswerHeader';
import Header from 'src/shared/components/Header/Header';
import IconButton, {
  IconButtonVariant,
} from 'src/shared/components/IconButton/IconButton';
import Loader from 'src/shared/components/Loader/Loader';
import AnswerTableRow from 'src/features/surveys/components/AnswerTableRow/AnswerTableRow';
import { useSurveyResultsManager } from 'src/features/surveys/managers/surveyResultsManager';

function SurveyResultsPage() {
  const {
    isLoading,
    title,
    handleCopyLink,
    surveyId,
    answersData,
    getSurveyData,
    chartData,
    votes,
    startDate,
    endDate,
  } = useSurveyResultsManager();

  return (
    <>
      <Head>
        <title>Survey Answers</title>
        <meta name="description" content="Survey Answers - Employee Pulse" />
      </Head>
      <Loader isLoading={isLoading} />
      {!isLoading && (
        <div className="container mx-auto text-center">
          <Header>Answers for &quot;{title}&quot;</Header>
          <div className="mb-6 flex flex-col justify-center sm:flex-row md:mb-10">
            <IconButton
              title="Copy link to clipboard"
              onClick={handleCopyLink(surveyId)}
              variant={IconButtonVariant.PRIMARY}
              className="mb-2 w-full justify-center sm:mr-2 sm:mb-0 sm:w-[170px]"
              icon={<LinkIcon className="h-5 w-5" />}
            >
              Copy link
            </IconButton>
            <IconButton
              title="Refresh data"
              onClick={() => getSurveyData(true)}
              variant={IconButtonVariant.OUTLINE}
              className="mt-2 w-full justify-center sm:mt-0 sm:ml-2 sm:w-[170px]"
              icon={<RefreshIcon className="h-5 w-5" />}
            >
              Refresh
            </IconButton>
          </div>

          <hr className=" md:hidden" />
          <AnswerHeader
            chartData={chartData}
            totalVotes={votes}
            startDate={startDate}
            endDate={endDate}
          />
          {answersData.length > 0 ? (
            <div className="mt-8 mb-6">
              {answersData.map((answer) => (
                <AnswerTableRow
                  key={answer.id}
                  time={answer.answerDate}
                  selectedIcon={answer.selectedIcon}
                  text={answer.answer}
                />
              ))}
            </div>
          ) : (
            <div className="mt-4">No answers yet</div>
          )}
        </div>
      )}
    </>
  );
}

export default withProtectedRoute(withAnimation(SurveyResultsPage));
