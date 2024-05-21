import {
  ChevronDownIcon,
  SelectorIcon,
  TrashIcon,
} from '@heroicons/react/outline';
import React, { ChangeEvent, PropsWithChildren } from 'react';
import Input, { InputSize } from 'shared/components/Input/Input';
import useTranslation from 'next-translate/useTranslation';
import {
  MAX_QUESTION_LENGTH,
  MIN_QUESTIONS,
} from 'shared/constants/surveysConfig';
import Toggle from 'shared/components/Toggle/Toggle';
import { DraggableProvidedDragHandleProps } from 'react-beautiful-dnd';
import clsx from 'clsx';
import QuestionTypeIcons from 'shared/components/QuestionTypeIcons/QuestionTypeIcons';
import { useSurveyCreatorContext } from 'features/surveys/features/SurveyCreator/managers/createSurveyManager/context';
import { DraftQuestion } from 'features/surveys/features/SurveyCreator/managers/createSurveyManager/createSurveyManager';
import Button, { ButtonSize } from 'shared/components/Button/Button';

interface QuestionBlockWrapperProps {
  index: number;
  questionData: DraftQuestion;
  dragHandleProps: DraggableProvidedDragHandleProps | null | undefined;
  advancedSettings?: React.ReactNode;
}

export default function QuestionBlockWrapper({
  children,
  index,
  dragHandleProps,
  questionData,
  advancedSettings,
}: PropsWithChildren<QuestionBlockWrapperProps>) {
  const { t } = useTranslation('surveyCreate');

  const {
    removeQuestion,
    updateQuestion,
    isSubmitted,
    updateQuestionRequired,
    expandQuestion,
    questions,
    isEditMode,
    expandAdvancedSettings,
  } = useSurveyCreatorContext();

  const isRemovingPossible = questions.length > MIN_QUESTIONS;
  const isDraggingPossible = questions.length > 1;

  const handleRequiredToggle = () => {
    updateQuestionRequired(index);
  };

  const toggleAdvancedSettings = () => {
    expandAdvancedSettings(index);
  };

  const questionError = () => {
    if (isSubmitted && questionData.title.length === 0) {
      return t('required');
    }

    return undefined;
  };

  const onExpand = () => {
    expandQuestion(index);
  };

  return (
    <div className="relative rounded-md border border-l-4 border-secondary-200  border-l-secondary-300 bg-white shadow-sm">
      <div className="flex flex-col items-start gap-0 pe-2 ps-2 pt-2 sm:flex-row sm:gap-2">
        <div className="flex w-full items-start gap-2">
          <Button
            onClick={onExpand}
            sizeType={ButtonSize.SMALL}
            className="bg-secondary-50"
          >
            <ChevronDownIcon
              className={clsx(
                'w-[15px] transition-transform',
                !questionData.expanded && '-rotate-90'
              )}
            />
          </Button>

          <div className="hidden sm:block">
            <QuestionTypeIcons type={questionData.type} index={index} />
          </div>

          <div className="w-full grow">
            <Input
              placeholder={t('questionPlaceholder')}
              onInput={(e: ChangeEvent<HTMLInputElement>) =>
                updateQuestion(e.target.value, index)
              }
              value={questionData.title}
              error={questionError()}
              className="mt-0 !bg-white"
              inputSize={InputSize.SMALL}
              maxLength={MAX_QUESTION_LENGTH}
              data-test-id={`question-input-${index}`}
            />
          </div>
        </div>

        <div className="mb-2 flex w-full items-center justify-end gap-2 sm:mb-0 sm:w-auto">
          <div className="mr-1 sm:hidden">
            <QuestionTypeIcons type={questionData.type} index={index} />
          </div>

          {(isDraggingPossible || isRemovingPossible) && (
            <div className="flex gap-2">
              {isDraggingPossible && (
                <div
                  className="h-[38px] cursor-pointer rounded-md border bg-secondary-50 p-[12px] shadow-sm hover:scale-95"
                  {...dragHandleProps}
                >
                  <SelectorIcon className="w-[14px]" />
                </div>
              )}
              {isRemovingPossible && (
                <Button
                  onClick={() => removeQuestion(index)}
                  sizeType={ButtonSize.SMALL}
                  disabled={isEditMode}
                  data-test-id={`remove-question-${index}`}
                  className=" cursor-pointer rounded-md border border-red-200 bg-red-200 p-[13px] shadow-sm hover:scale-95 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100"
                >
                  <TrashIcon className="w-[15px] text-red-900" />
                </Button>
              )}
            </div>
          )}
        </div>
      </div>

      {questionData.expanded && (
        <div className="mb-2.5 px-2">
          {isEditMode ? (
            <div className="relative opacity-50">
              <div className="absolute z-50 h-full w-full cursor-not-allowed"></div>

              {children}
            </div>
          ) : (
            children
          )}

          <div className="relative min-h-[36px] border-t pt-2">
            {!!advancedSettings && (
              <div className="w-fulltext-left hidden text-sm md:block">
                <button
                  onClick={toggleAdvancedSettings}
                  className="flex w-auto cursor-pointer items-center gap-2 py-1 pl-1.5"
                >
                  <ChevronDownIcon
                    className={clsx(
                      'w-[15px] transition-transform',
                      !questionData.advancedSettingsExpanded && '-rotate-90'
                    )}
                  />
                  Show advanced settings
                </button>
                {questionData.advancedSettingsExpanded && (
                  <div className="ml-8 mr-2 mt-1 py-2">{advancedSettings}</div>
                )}
              </div>
            )}

            <div className="absolute right-1 top-3">
              <Toggle
                label={t('requiredToggle')}
                onToggle={handleRequiredToggle}
                isEnabled={questionData.isRequired}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
