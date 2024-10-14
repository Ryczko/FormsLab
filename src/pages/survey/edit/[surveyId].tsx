import Head from 'next/head';
import useTranslation from 'next-translate/useTranslation';

import { InferGetServerSidePropsType, NextPageContext } from 'next';
import { getSurveyData } from 'pages/api/answer/[id]';
import { getSession } from 'next-auth/react';
import SurveyCreator from 'features/surveys/features/SurveyCreator/SurveyCreator';
import { SurveyCreatorContext } from 'features/surveys/features/SurveyCreator/managers/createSurveyManager/context';
import { useCreateSurveyManager } from 'features/surveys/features/SurveyCreator/managers/createSurveyManager/createSurveyManager';
import FullPageWrapper from 'layout/FullPageWrapper';
import withAnimation from 'shared/HOC/withAnimation';
import { usePreviewPanelManager } from 'features/surveys/features/SurveyCreator/managers/previewPanelManager/previewPanelManager';
import { PreviewPanelContext } from 'features/surveys/features/SurveyCreator/managers/previewPanelManager/context';

export async function getServerSideProps(context: NextPageContext) {
  const surveyId = context.query.surveyId as string;
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

function SurveyEditPage({
  initialData,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { t } = useTranslation('surveyCreate');

  const manager = useCreateSurveyManager(initialData);
  const previewPanelManager = usePreviewPanelManager();

  return (
    <FullPageWrapper>
      <Head>
        <title>{t('title')}</title>
        <meta name="description" content={t('content')} />
      </Head>

      <SurveyCreatorContext.Provider value={manager}>
        <PreviewPanelContext.Provider value={previewPanelManager}>
          <SurveyCreator />
        </PreviewPanelContext.Provider>
      </SurveyCreatorContext.Provider>
    </FullPageWrapper>
  );
}

export default withAnimation(SurveyEditPage);
