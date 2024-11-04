import React, { useState } from 'react';
import { usePreviewPanelContext } from 'features/surveys/features/SurveyCreator/managers/previewPanelManager/context';
import { useSurveyCreatorContext } from 'features/surveys/features/SurveyCreator/managers/createSurveyManager/context';
import TemplateItem from 'features/surveys/features/SurveyCreator/components/Templates/TemplateItem';
import { TEMPLATES } from 'features/surveys/features/SurveyCreator/constants/Templates';
import { DraftQuestion } from 'features/surveys/features/SurveyCreator/managers/createSurveyManager/createSurveyManager';
import clsx from 'clsx';
import withAnimation from 'shared/HOC/withAnimation';

export interface Template {
  title: string;
  questions: DraftQuestion[];
}

function Templates() {
  const { togglePanel, isPanelOpened, handleRestart } =
    usePreviewPanelContext();

  const {
    selectTemplate,
    getDraftSurveyFromSessionStorage,
    setIsTemplatePicked,
  } = useSurveyCreatorContext();

  const [previewIndex, setPreviewIndex] = useState<number | null>(
    getDraftSurveyFromSessionStorage() ? 0 : 1
  );

  const toggleOnLargeScreen = () => {
    if (window.innerWidth > 1280 && !isPanelOpened) {
      togglePanel();
    }
  };

  const handleContinueLastSurveyPreview = (
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    event.stopPropagation();
    const draftSurvey = getDraftSurveyFromSessionStorage();
    selectTemplate(draftSurvey?.title ?? '', draftSurvey?.questions ?? []);
    handleRestart();
    setPreviewIndex(0);
    toggleOnLargeScreen();
  };

  const handleTemplatePreview = (
    event: React.MouseEvent<HTMLDivElement>,
    template: Template,
    previewIndex: number
  ) => {
    event.stopPropagation();

    selectTemplate(template.title, template.questions);
    handleRestart();
    setPreviewIndex(previewIndex);
    toggleOnLargeScreen();
  };

  const handleTemplatePick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setIsTemplatePicked(true);
  };

  const isDraftSurvey = !!getDraftSurveyFromSessionStorage();

  const fieldsCount = 1 + (isDraftSurvey ? 1 : 0) + TEMPLATES.length;

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {isDraftSurvey && (
          <TemplateItem
            onTemplatePick={handleTemplatePick}
            title="Continue from where you left off"
            onTemplatePreview={handleContinueLastSurveyPreview}
            isInPreview={previewIndex === 0}
            buttonContent="Continue"
          />
        )}

        <TemplateItem
          onTemplatePick={handleTemplatePick}
          onTemplatePreview={(e) =>
            handleTemplatePreview(e, { title: '', questions: [] }, 1)
          }
          isInPreview={previewIndex === 1}
          buttonContent="Start from scratch"
        />

        {TEMPLATES.map((template, index) => (
          <TemplateItem
            key={index}
            onTemplatePick={handleTemplatePick}
            template={template}
            title={template.title}
            isInPreview={previewIndex === index + 2}
            onTemplatePreview={(e) =>
              handleTemplatePreview(e, template, index + 2)
            }
          />
        ))}
        <div
          className={clsx(
            'flex h-[140px] flex-grow flex-col items-center justify-center rounded border border-dashed border-zinc-600/50 p-2',
            fieldsCount % 2 === 0 ? 'md:col-span-2' : 'md:col-span-1'
          )}
        >
          <div className="mb-2 font-semibold">More templates soon!</div>
          <div>
            Any suggestions?
            <a
              target="_blank"
              className="ml-1 underline"
              href="https://github.com/Ryczko/FormsLab/issues"
            >
              Create an issue
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default withAnimation(Templates);
