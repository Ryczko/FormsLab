import Head from 'next/head';
import { useSurveyAnswerManager } from 'features/surveys/managers/surveyAnswerManager';
import useTranslation from 'next-translate/useTranslation';
import { InferGetServerSidePropsType, NextPageContext } from 'next';
import { getSurveyData } from 'pages/api/answer/[id]';
import AllQuestionsView from 'features/surveys/components/AllQuestionsView/AllQuestionsView';
import OneQuestionView from 'features/surveys/components/OneQuestionView/OneQuestionView';
import Progressbar from 'shared/components/ProgressBar/ProgressBar';

export async function getServerSideProps(context: NextPageContext) {
  const surveyData = await getSurveyData(context.query.surveyId as string);

  return {
    props: {
      initialData: JSON.parse(JSON.stringify(surveyData)),
    },
  };
}

function AnswerPage({
  initialData,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const {
    handleAnswerChange,
    handleSave,
    isAnswering,
    formData,
    isSubmitted,
    activeQuestionIndex,
    handleNextQuestion,
    handlePreviousQuestion,
  } = useSurveyAnswerManager(initialData);
  const { t } = useTranslation('survey');

  return (
    <>
      <Head>
        <title>{t('title')}</title>
        <meta name="description" content={t('content')} />
      </Head>
      <div className="w-full">
        {formData?.isActive ? (
          formData.oneQuestionPerStep ? (
            <div>
              <OneQuestionView
                activeQuestionIndex={activeQuestionIndex}
                formData={formData}
                handleNextQuestion={handleNextQuestion}
                handlePreviousQuestion={handlePreviousQuestion}
                isSubmitted={isSubmitted}
                handleAnswerChange={handleAnswerChange}
                isAnswering={isAnswering}
              />
              <Progressbar
                currentStep={activeQuestionIndex}
                totalSteps={formData?.questions.length}
              />
            </div>
          ) : (
            <AllQuestionsView
              formData={formData}
              handleSave={handleSave}
              handleAnswerChange={handleAnswerChange}
              isAnswering={isAnswering}
              isSubmitted={isSubmitted}
            />
          )
        ) : (
          <>
            <div className="text-5xl">🙁</div>
            <div className="my-5 text-xl">{t('surveyNoLongerActive')}</div>
          </>
        )}
      </div>
    </>
  );
}

export default AnswerPage;
