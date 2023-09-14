import Head from 'next/head';
import { ButtonVariant } from 'shared/components/Button/Button';
import { useSurveyAnswerManager } from 'features/surveys/managers/surveyAnswerManager';
import ButtonLink from 'shared/components/ButtonLink/ButtonLink';
import useTranslation from 'next-translate/useTranslation';
import { InferGetServerSidePropsType, NextPageContext } from 'next';
import { getSurveyData } from 'pages/api/answer/[id]';
import AllQuestionsView from 'features/surveys/components/AllQuestionsView/AllQuestionsView';
import OneQuestionView from 'features/surveys/components/OneQuestionView/OneQuestionView';

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
            <OneQuestionView
              activeQuestionIndex={activeQuestionIndex}
              formData={formData}
              handleNextQuestion={handleNextQuestion}
              handlePreviousQuestion={handlePreviousQuestion}
              isSubmitted={isSubmitted}
              handleAnswerChange={handleAnswerChange}
              isAnswering={isAnswering}
            />
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
            <h1 className="text-5xl">🙁</h1>
            <h1 className="my-5 text-xl">{t('surveyNoLongerActive')}</h1>
            <ButtonLink
              href={'/'}
              variant={ButtonVariant.PRIMARY}
              className="w-full sm:w-auto"
            >
              {t('backHomeButton')}
            </ButtonLink>
          </>
        )}
      </div>
    </>
  );
}

export default AnswerPage;
