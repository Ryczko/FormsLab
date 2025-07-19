import React, { useState } from 'react';
import { usePreviewPanelContext } from 'features/surveys/features/SurveyCreator/managers/previewPanelManager/context';
import { useSurveyCreatorContext } from 'features/surveys/features/SurveyCreator/managers/createSurveyManager/context';
import TemplateItem from 'features/surveys/features/SurveyCreator/components/Templates/TemplateItem';
import { TEMPLATES } from 'features/surveys/features/SurveyCreator/constants/Templates';
import { DraftQuestion } from 'features/surveys/features/SurveyCreator/managers/createSurveyManager/createSurveyManager';
import withAnimation from 'shared/HOC/withAnimation';
import StyledDialog from 'shared/components/StyledDialog/StyledDialog';
import Button, { ButtonVariant } from 'shared/components/Button/Button';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/outline';

export interface Template {
  title: string;
  questions: DraftQuestion[];
}

function Templates() {
  const { handleRestart } = usePreviewPanelContext();

  const { selectTemplate } = useSurveyCreatorContext();

  const [showGallery, setShowGallery] = useState(false);
  const [isWarningOpen, setIsWarningOpen] = useState(false);
  const [pendingTemplate, setPendingTemplate] = useState<Template | null>(null);

  const handleTemplateClick = (
    event: React.MouseEvent<HTMLDivElement>,
    template: Template
  ) => {
    event.stopPropagation();
    setPendingTemplate(template);
    setIsWarningOpen(true);
  };

  const confirmTemplateChange = () => {
    if (pendingTemplate) {
      selectTemplate(pendingTemplate.title, pendingTemplate.questions);
      handleRestart();
    }
    setIsWarningOpen(false);
    setShowGallery(false);
    setPendingTemplate(null);
  };

  return (
    <>
      <StyledDialog
        isOpen={isWarningOpen}
        onClose={() => setIsWarningOpen(false)}
        title="Warning"
        content={
          <div className="mt-4 flex flex-col gap-4">
            <span>
              All unsaved changes will be lost. Are you sure you want to
              continue?
            </span>
            <div className="mt-2 flex justify-between gap-2">
              <Button
                variant={ButtonVariant.SECONDARY}
                onClick={() => setIsWarningOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant={ButtonVariant.DANGER}
                onClick={confirmTemplateChange}
                data-test-id="confirm-template-change"
              >
                Continue
              </Button>
            </div>
          </div>
        }
      />
      <div className="mb-2 flex items-center justify-between md:mb-4">
        <span className="text-base font-semibold md:text-lg">
          Start a new form
        </span>
        <button
          className="flex items-center gap-2 text-sm"
          onClick={() => setShowGallery((prev) => !prev)}
          data-test-id={'expand-templates'}
        >
          Pick template
          {showGallery ? (
            <ChevronUpIcon className="h-5 w-5" />
          ) : (
            <ChevronDownIcon className="h-5 w-5" />
          )}
        </button>
      </div>
      {showGallery && (
        <>
          <div className="my-4 grid grid-cols-1 gap-2 md:grid-cols-3">
            <TemplateItem
              onTemplatePreview={(e) =>
                handleTemplateClick(e, { title: '', questions: [] })
              }
              fieldTestSelector="start-from-scratch-field"
            />
            {TEMPLATES.map((template, index) => (
              <TemplateItem
                key={`gallery-${index}`}
                title={template.title}
                onTemplatePreview={(e) => handleTemplateClick(e, template)}
              />
            ))}
          </div>
          <hr className="mb-4" />
        </>
      )}
    </>
  );
}

export default withAnimation(Templates);
