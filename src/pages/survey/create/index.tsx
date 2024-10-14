import Head from 'next/head';
import useTranslation from 'next-translate/useTranslation';

import SurveyCreator from 'features/surveys/features/SurveyCreator/SurveyCreator';
import { SurveyCreatorContext } from 'features/surveys/features/SurveyCreator/managers/createSurveyManager/context';
import { useCreateSurveyManager } from 'features/surveys/features/SurveyCreator/managers/createSurveyManager/createSurveyManager';
import FullPageWrapper from 'layout/FullPageWrapper';
import withAnimation from 'shared/HOC/withAnimation';
import { usePreviewPanelManager } from 'features/surveys/features/SurveyCreator/managers/previewPanelManager/previewPanelManager';
import { PreviewPanelContext } from 'features/surveys/features/SurveyCreator/managers/previewPanelManager/context';

function SurveyCreatePage() {
  const { t } = useTranslation('surveyCreate');

  const manager = useCreateSurveyManager();
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

export default withAnimation(SurveyCreatePage);
