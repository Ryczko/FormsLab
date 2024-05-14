import React from 'react';
import TitleAndConfigSection from 'features/surveys/features/SurveyCreator/components/TitleAndConfigSection/TitleAndConfigSection';
import QuestionsSection from 'features/surveys/features/SurveyCreator/components/QuestionsSection/QuestionsSection';
import ActionButtons from 'features/surveys/features/SurveyCreator/components/ActionButtons/ActionButtons';
import clsx from 'clsx';
import { usePreviewPanelContext } from 'features/surveys/features/SurveyCreator/managers/previewPanelManager/context';
import PreviewPanel from 'features/surveys/features/SurveyCreator/components/PreviewPanel/PreviewPanel';

export default function SurveyCreator() {
  const { isPanelOpened } = usePreviewPanelContext();

  return (
    <>
      <div
        className={clsx(
          'flex-grow py-8 transition-all duration-500 ease-in-out',
          isPanelOpened && 'xl:mr-[550px]'
        )}
      >
        <div className="mx-auto max-w-[58rem] px-4 xl:px-10">
          <TitleAndConfigSection />
          <QuestionsSection />
          <ActionButtons />
        </div>
      </div>

      <PreviewPanel />
    </>
  );
}
