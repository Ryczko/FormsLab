import {
  ChevronDownIcon,
  SelectorIcon,
  TrashIcon,
} from '@heroicons/react/outline';
import { ChangeEvent, PropsWithChildren } from 'react';
import Input from 'shared/components/Input/Input';
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
import { Question } from 'features/surveys/features/SurveyCreator/managers/createSurveyManager/createSurveyManager';

interface QuestionBlockWrapperProps {
  index: number;
  questionData: Question;
  dragHandleProps: DraggableProvidedDragHandleProps | null | undefined;
}

export default function QuestionBlockWrapper({
  children,
  index,
  dragHandleProps,
  questionData,
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
  } = useSurveyCreatorContext();

  const isRemovingPossible = questions.length > MIN_QUESTIONS;
  const isDraggingPossible = questions.length > 1;

  const handleRequiredToggle = () => {
    updateQuestionRequired(index);
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
    <div className="relative overflow-hidden rounded-md border bg-white/30 shadow-sm">
      <div className="flex flex-col items-start gap-1 px-3 pb-1 pt-3 sm:flex-row sm:gap-2">
        <div className="flex w-full items-start gap-2">
          <button
            onClick={onExpand}
            className="h-[42px] cursor-pointer rounded-md border border-opacity-100 bg-zinc-50 p-[13px]"
          >
            <ChevronDownIcon
              className={clsx(
                'w-[15px] transition-transform',
                !questionData.expanded && '-rotate-90'
              )}
            />
          </button>

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
              className="mt-0 h-[42px]"
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
                  className="h-[42px] cursor-pointer rounded-md border bg-zinc-50 p-[13px] shadow-sm hover:scale-95"
                  {...dragHandleProps}
                >
                  <SelectorIcon className="w-[15px]" />
                </div>
              )}
              {isRemovingPossible && (
                <button
                  onClick={() => removeQuestion(index)}
                  disabled={isEditMode}
                  data-test-id={`remove-question-${index}`}
                  className="h-[42px] cursor-pointer rounded-md border border-red-200 bg-red-200 p-[13px] shadow-sm hover:scale-95 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100"
                >
                  <TrashIcon className="w-[15px] text-red-900" />
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {questionData.expanded && (
        <div className="mb-4 px-3">
          {isEditMode ? (
            <div className="relative opacity-50">
              <div className="absolute z-50 h-full w-full cursor-not-allowed"></div>

              {children}
            </div>
          ) : (
            children
          )}

          <div className="mt-2 flex justify-end border-t">
            <Toggle
              classNames="mt-3.5"
              label={t('requiredToggle')}
              onToggle={handleRequiredToggle}
              isEnabled={questionData.isRequired}
            />
          </div>
        </div>
      )}
    </div>
  );
}
