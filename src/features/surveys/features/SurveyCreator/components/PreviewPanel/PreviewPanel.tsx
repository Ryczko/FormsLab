import clsx from 'clsx';
import SurveyDisplay from 'features/surveys/features/SurveyDisplay/SurveyDisplay';
import Background from 'layout/Background/Background';
import React from 'react';
import { useSurveyCreatorContext } from 'features/surveys/features/SurveyCreator/managers/createSurveyManager/context';
import { usePreviewPanelContext } from 'features/surveys/features/SurveyCreator/managers/previewPanelManager/context';
import { XIcon } from '@heroicons/react/outline';

export default function PreviewPanel() {
  const { questions, title, surveyOptions } = useSurveyCreatorContext();

  const { isPanelOpened, togglePanel } = usePreviewPanelContext();

  return (
    <>
      {isPanelOpened && (
        <div
          onClick={togglePanel}
          className={'fixed h-full w-full bg-black/20 xl:hidden'}
        ></div>
      )}

      <div
        className={clsx(
          'fixed bottom-0 right-0 top-[var(--navigation-height)] w-[550px] max-w-[100vw] items-center overflow-hidden border-l transition-transform duration-500 ease-in-out',
          !isPanelOpened && 'translate-x-full'
        )}
      >
        <div className="flex h-[40px] items-center justify-between border-b bg-zinc-50 pl-6 pr-4 text-left font-semibold">
          <h2>Survey preview</h2>

          <XIcon onClick={togglePanel} className="h-5 w-5 cursor-pointer" />
        </div>
        <div className="no-scrollbar h-[calc(100%-40px)] overflow-auto p-6 pb-0">
          <Background hideAccents />
          <SurveyDisplay
            previewMode
            initialData={{
              isActive: true,
              description: '',
              id: '',
              displayTitle: surveyOptions.displayTitle,
              oneQuestionPerStep: surveyOptions.oneQuestionPerStep,
              hideProgressBar: surveyOptions.hideProgressBar,
              userId: '',
              title,
              accentColor: surveyOptions.accentColor,
              createdAt: new Date(),
              questions: questions.map((question, index) => ({
                surveyId: '',
                options: question.options ?? [],
                order: index,
                createdAt: new Date(),
                id: question.id,
                title: question.title,
                type: question.type,
                answers: [],
                description: '',
                isRequired: question.isRequired,
              })),
            }}
          />
        </div>
      </div>
    </>
  );
}
