import Head from 'next/head';
import Button, {
  ButtonVariant,
  ButtonSize,
} from 'shared/components/Button/Button';
import Header from 'shared/components/Header/Header';
import { useSurveyAnswerManager } from 'features/surveys/managers/surveyAnswerManager';
import ButtonLink from 'shared/components/ButtonLink/ButtonLink';
import { AnswersComponentFactory } from 'features/surveys/components/AnswersComponent/AnswersComponentFactory';
import useTranslation from 'next-translate/useTranslation';
import { InferGetServerSidePropsType, NextPageContext } from 'next';
import { getSurveyData } from 'pages/api/answer/[id]';

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
  const { handleAnswerChange, handleSave, isAnswering, formData, isSubmitted } =
    useSurveyAnswerManager(initialData);
  const { t } = useTranslation('survey');

  return (
    <>
      <Head>
        <title>{t('title')}</title>
        <meta name="description" content={t('content')} />
      </Head>
      <>
        {formData?.isActive ? (
          <>
            <Header>{formData?.title}</Header>

            {formData?.questions.map((question) => {
              return (
                <AnswersComponentFactory
                  key={question.id}
                  question={question.title}
                  type={question.type}
                  options={question.options}
                  answer={question.answer}
                  questionId={question.id}
                  handleAnswerChange={handleAnswerChange}
                  isSubmitted={isSubmitted}
                />
              );
            })}

            <div className="flex justify-center">
              <Button
                onClick={handleSave}
                variant={ButtonVariant.PRIMARY}
                sizeType={ButtonSize.FULL}
                isLoading={isAnswering}
              >
                {t('sendButton')}
              </Button>
            </div>
          </>
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
      </>
    </>
  );
}

export default AnswerPage;
