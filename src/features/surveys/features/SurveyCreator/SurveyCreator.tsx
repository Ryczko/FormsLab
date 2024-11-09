import React from 'react';
import clsx from 'clsx';
import { usePreviewPanelContext } from 'features/surveys/features/SurveyCreator/managers/previewPanelManager/context';
import PreviewPanel from 'features/surveys/features/SurveyCreator/components/PreviewPanel/PreviewPanel';
import { useSurveyCreatorContext } from 'features/surveys/features/SurveyCreator/managers/createSurveyManager/context';

import dynamic from 'next/dynamic';
import CreatorContent from 'features/surveys/features/SurveyCreator/components/CreatorContent/CreatorContent';

const Templates = dynamic(
  () =>
    import(
      'features/surveys/features/SurveyCreator/components/Templates/Templates'
    ),
  { ssr: false }
);

export default function SurveyCreator() {
  const { isPanelOpened } = usePreviewPanelContext();
  const { isEditMode, isTemplatePicked } = useSurveyCreatorContext();

  return (
    <>
      <div
        className={clsx(
          'flex-grow py-8 transition-all duration-500 ease-in-out',
          isPanelOpened && 'xl:mr-[550px]'
        )}
      >
        <div className="mx-auto max-w-[58rem] px-4 xl:px-10">
          {!isTemplatePicked && !isEditMode ? (
            <Templates />
          ) : (
            <CreatorContent />
          )}
        </div>
      </div>

      <PreviewPanel />
    </>
  );
}
