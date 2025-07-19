import React from 'react';
import clsx from 'clsx';
import { usePreviewPanelContext } from 'features/surveys/features/SurveyCreator/managers/previewPanelManager/context';
import PreviewPanel from 'features/surveys/features/SurveyCreator/components/PreviewPanel/PreviewPanel';

import CreatorContent from 'features/surveys/features/SurveyCreator/components/CreatorContent/CreatorContent';

export default function SurveyCreator() {
  const { isPanelOpened, openedWithoutAnimation } = usePreviewPanelContext();

  return (
    <>
      <div
        className={clsx(
          'flex-grow py-8',
          !openedWithoutAnimation && 'transition-all duration-500 ease-in-out',
          isPanelOpened && 'xl:mr-[550px]'
        )}
      >
        <div className="mx-auto max-w-[58rem] px-4 xl:px-10">
          <CreatorContent />
        </div>
      </div>

      <PreviewPanel />
    </>
  );
}
