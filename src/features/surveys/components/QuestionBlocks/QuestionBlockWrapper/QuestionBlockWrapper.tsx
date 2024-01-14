import {
  ChevronDownIcon,
  SelectorIcon,
  TrashIcon,
} from '@heroicons/react/outline';
import { ChangeEvent, PropsWithChildren } from 'react';
import Input from 'shared/components/Input/Input';
import useTranslation from 'next-translate/useTranslation';
import { MAX_QUESTION_LENGTH } from 'shared/constants/surveysConfig';
import Toggle from 'shared/components/Toggle/Toggle';
import { DraggableProvidedDragHandleProps } from 'react-beautiful-dnd';
import clsx from 'clsx';
import { QuestionType } from '@prisma/client';
import QuestionTypeIcons from 'shared/components/QuestionTypeIcons/QuestionTypeIcons';
import { Tooltip } from 'react-tooltip';

interface QuestionBlockWrapperProps {
  index: number;
  onQuestionRemove?: (index: number) => void;
  updateQuestion: (newQuestion: string, questionIndex: number) => void;
  questionTitle: string;
  isSubmitted: boolean;
  isRemovingPossible: boolean;
  isDraggingPossible: boolean;
  updateQuestionRequired: (questionIndex: number) => void;
  isRequired: boolean;
  dragHandleProps: DraggableProvidedDragHandleProps | null | undefined;
  expanded: boolean;
  expandQuestion: (questionIndex: number) => void;
  type: QuestionType;
  isEditMode: boolean;
}

export default function QuestionBlockWrapper({
  children,
  index,
  onQuestionRemove,
  updateQuestion,
  questionTitle,
  isSubmitted,
  isRemovingPossible,
  isRequired,
  updateQuestionRequired,
  dragHandleProps,
  isDraggingPossible,
  expanded,
  expandQuestion,
  type,
  isEditMode,
}: PropsWithChildren<QuestionBlockWrapperProps>) {
  const { t } = useTranslation('surveyCreate');

  const removeQuestion = () => {
    onQuestionRemove?.(index);
  };

  const handleQuestionChange = (e: ChangeEvent<HTMLInputElement>) => {
    updateQuestion(e.target.value, index);
  };

  const handleRequiredToggle = () => {
    updateQuestionRequired(index);
  };

  const questionError = () => {
    if (isSubmitted && questionTitle.length === 0) {
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
            className="cursor-pointer rounded-md border border-opacity-100 p-[13px]"
          >
            <ChevronDownIcon
              className={clsx(
                'w-[15px] transition-transform',
                !expanded && '-rotate-90'
              )}
            />
          </button>

          <Tooltip className='z-10'  id={`my-tooltip-${index}`}  place='top' />

          <div className="hidden sm:block" data-tooltip-id={`my-tooltip-${index}`} data-tooltip-content={`${type} QUESTION`}>
            <QuestionTypeIcons type={type} />
          </div>

          <div className="w-full grow">
            <Input
              placeholder={t('questionPlaceholder')}
              onInput={handleQuestionChange}
              value={questionTitle}
              error={questionError()}
              className="mt-0"
              maxLength={MAX_QUESTION_LENGTH}
              data-test-id={`question-input-${index}`}
            />
          </div>
        </div>

        <div className="mb-2 flex w-full items-center justify-end gap-2 sm:mb-0 sm:w-auto">
          <div className="mr-1 sm:hidden" data-tooltip-id={`my-tooltip-${index}`} data-tooltip-content={`${type} QUESTION`}>
            <QuestionTypeIcons type={type} />
          </div>

          {(isDraggingPossible || isRemovingPossible) && (
            <div className="flex gap-2">
              {isDraggingPossible && (
                <div
                  className="cursor-pointer rounded-md border bg-white p-[13px] shadow-sm hover:scale-95"
                  {...dragHandleProps}
                >
                  <SelectorIcon className="w-[15px]" />
                </div>
              )}
              {isRemovingPossible && (
                <button
                  onClick={removeQuestion}
                  disabled={isEditMode}
                  data-test-id={`remove-question-${index}`}
                  className="cursor-pointer rounded-md border bg-white p-[13px] shadow-sm hover:scale-95 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100"
                >
                  <TrashIcon className="w-[15px] text-red-700" />
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {expanded && (
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
              isEnabled={isRequired}
            />
          </div>
        </div>
      )}
    </div>
  );
}
