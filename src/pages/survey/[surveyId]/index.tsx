import Head from 'next/head';
import useTranslation from 'next-translate/useTranslation';
import { InferGetServerSidePropsType, NextPageContext } from 'next';
import { getSurveyData } from 'pages/api/answer/[id]';

import SurveyDisplay from 'features/surveys/features/SurveyDisplay/SurveyDisplay';
import ExternalPageWrapper from 'layout/ExternalRouteWrapper';

export async function getServerSideProps(context: NextPageContext) {
  const surveyData = await getSurveyData(context.query.surveyId as string);

  if (surveyData) {
    surveyData.questions = surveyData?.questions.map((question) => {
      return {
        ...question,
        answer: '',
      };
    });
  }

  return {
    props: {
      initialData: JSON.parse(JSON.stringify(surveyData)),
    },
  };
}

function AnswerPage({
  initialData,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { t } = useTranslation('survey');

  return (
    <ExternalPageWrapper>
      <Head>
        <title>{t('title')}</title>
        <meta name="description" content={t('content')} />
      </Head>

      <SurveyDisplay initialData={initialData} />
    </ExternalPageWrapper>
  );
}

export default AnswerPage;
