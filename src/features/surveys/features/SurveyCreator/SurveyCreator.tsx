import useTranslation from 'next-translate/useTranslation';

import React from 'react';
import Header from 'shared/components/Header/Header';
import { useSurveyCreatorContext } from 'features/surveys/features/SurveyCreator/managers/createSurveyManager/context';
import TitleAndConfigSection from 'features/surveys/features/SurveyCreator/components/TitleAndConfigSection/TitleAndConfigSection';
import QuestionsSection from 'features/surveys/features/SurveyCreator/components/QuestionsSection/QuestionsSection';
import ActionButtons from 'features/surveys/features/SurveyCreator/components/ActionButtons/ActionButtons';
import clsx from 'clsx';
import { usePreviewPanelContext } from 'features/surveys/features/SurveyCreator/managers/previewPanelManager/context';
import PreviewPanel from 'features/surveys/features/SurveyCreator/components/PreviewPanel/PreviewPanel';

export default function SurveyCreator() {
  const { t } = useTranslation('surveyCreate');

  const { isEditMode } = useSurveyCreatorContext();

  const { isPanelOpened } = usePreviewPanelContext();

  return (
    <>
      <div
        className={clsx(
          'flex-grow py-8 transition-all duration-500 ease-in-out',
          isPanelOpened && 'xl:mr-[550px]'
        )}
      >
        <div className="mx-auto max-w-[58rem] px-6 xl:px-10">
          <Header>{isEditMode ? t('editHeading') : t('heading')}</Header>
          <TitleAndConfigSection />
          <QuestionsSection />
          <ActionButtons />
        </div>
      </div>

      <PreviewPanel />
    </>
  );
}
