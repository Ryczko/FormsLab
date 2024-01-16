import Head from 'next/head';
import withAnimation from 'shared/HOC/withAnimation';
import useTranslation from 'next-translate/useTranslation';

import { InferGetServerSidePropsType, NextPageContext } from 'next';
import { getSurveyData } from 'pages/api/answer/[id]';
import { getSession } from 'next-auth/react';
import SurveyCreator from 'features/surveys/features/SurveyCreator/SurveyCreator';
import { SurveyCreatorContext } from 'features/surveys/features/SurveyCreator/context';
import { useCreateSurveyManager } from 'features/surveys/features/SurveyCreator/managers/createSurveyManager';

export async function getServerSideProps(context: NextPageContext) {
  const surveyId = context.query.surveyId?.[0];
  let surveyData;

  if (surveyId) {
    const session = await getSession(context);
    if (!session) {
      return {
        redirect: {
          destination: '/login',
        },
      };
    }

    surveyData = await getSurveyData(surveyId, session.user?.id);

    if (!surveyData) {
      return {
        redirect: {
          destination: '/survey/create',
        },
      };
    }
  }

  return {
    props: {
      initialData: surveyData ? JSON.parse(JSON.stringify(surveyData)) : null,
    },
  };
}

function SurveyCreatePage({
  initialData,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { t } = useTranslation('surveyCreate');

  const manager = useCreateSurveyManager(initialData);

  return (
    <>
      <Head>
        <title>{t('title')}</title>
        <meta name="description" content={t('content')} />
      </Head>

      <SurveyCreatorContext.Provider value={manager}>
        <SurveyCreator />
      </SurveyCreatorContext.Provider>
    </>
  );
}

export default withAnimation(SurveyCreatePage);
