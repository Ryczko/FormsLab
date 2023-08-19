import { SelectorIcon, TrashIcon } from '@heroicons/react/outline';
import { ChangeEvent, PropsWithChildren } from 'react';
import Input from 'shared/components/Input/Input';
import useTranslation from 'next-translate/useTranslation';
import { MAX_QUESTION_LENGTH } from 'shared/constants/surveysConfig';
import Toggle from 'shared/components/Toggle/Toggle';
import { DraggableProvidedDragHandleProps } from 'react-beautiful-dnd';

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

  return (
    <div className="relative rounded-md border bg-white/30 p-4 pr-8 shadow-sm">
      <div className="absolute right-0 top-0 translate-x-[50%] translate-y-[-15%] space-y-1 px-1">
        {isRemovingPossible && (
          <button
            onClick={removeQuestion}
            className="cursor-pointer rounded-md bg-white p-[6px] shadow-md hover:scale-95"
          >
            <TrashIcon className="w-[16px] text-red-700" />
          </button>
        )}

        {isDraggingPossible && (
          <div
            className="cursor-pointer rounded-md bg-white p-[6px] shadow-md hover:scale-95"
            {...dragHandleProps}
          >
            <SelectorIcon className="w-[16px]" />
          </div>
        )}
      </div>

      <div className="flex flex-col items-start gap-2 sm:flex-row sm:gap-4">
        <div className="w-full grow">
          <Input
            placeholder={t('questionPlaceholder')}
            onInput={handleQuestionChange}
            className="mt-2"
            value={questionTitle}
            error={questionError()}
            maxLength={MAX_QUESTION_LENGTH}
            data-test-id={`question-input-${index}`}
          />
        </div>
        <div className="flex w-full justify-center sm:w-auto">
          <Toggle
            classNames="sm:mt-4"
            label={t('requiredToggle')}
            onToggle={handleRequiredToggle}
            isEnabled={isRequired}
          />
        </div>
      </div>
      {children}
    </div>
  );
}
