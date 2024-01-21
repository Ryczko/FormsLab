import Head from 'next/head';
import withProtectedRoute from 'shared/HOC/withProtectedRoute';
import useTranslation from 'next-translate/useTranslation';
import { InferGetServerSidePropsType, NextPageContext } from 'next';
import { getSession } from 'next-auth/react';

import { getSurveyWithAnswers } from 'pages/api/survey/[id]';
import { SurveyWithAnswers } from 'types/SurveyWithAnswers';
import SurveyResults from 'features/surveys/features/SurveyResults/SurveyResults';
import StandardPageWrapper from 'layout/StandardPageWrapper';
import withAnimation from 'shared/HOC/withAnimation';
import { useSurveyResultsManager } from 'features/surveys/features/SurveyResults/managers/surveyResultsManager';
import { SurveyResultsContext } from 'features/surveys/features/SurveyResults/managers/context';

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  const surveyData = (await getSurveyWithAnswers(
    context.query.surveyId as string,
    session.user?.id
  )) as SurveyWithAnswers;

  if (!surveyData) {
    return {
      redirect: {
        destination: '/404',
        permanent: false,
      },
    };
  }

  return {
    props: {
      initialData: JSON.parse(JSON.stringify(surveyData)),
    },
  };
}

function SurveyResultsPage({
  initialData,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { t } = useTranslation('surveyAnswer');

  const manager = useSurveyResultsManager(initialData);

  return (
    <StandardPageWrapper>
      <Head>
        <title>{t('title')}</title>
        <meta name="description" content={t('content')} />
      </Head>

      <SurveyResultsContext.Provider value={manager}>
        <SurveyResults />
      </SurveyResultsContext.Provider>
    </StandardPageWrapper>
  );
}

export default withProtectedRoute(withAnimation(SurveyResultsPage));
