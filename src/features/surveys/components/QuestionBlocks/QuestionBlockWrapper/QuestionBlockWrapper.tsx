import { TrashIcon } from '@heroicons/react/outline';
import { ChangeEvent, PropsWithChildren } from 'react';
import Input from 'shared/components/Input/Input';
import useTranslation from 'next-translate/useTranslation';
import { MAX_QUESTION_LENGTH } from 'shared/constants/surveysConfig';
import Toggle from 'shared/components/Toggle/Toggle';

interface QuestionBlockWrapperProps {
  index: number;
  onQuestionRemove?: (index: number) => void;
  updateQuestion: (newQuestion: string, questionIndex: number) => void;
  questionTitle: string;
  isSubmitted: boolean;
  isRemovingPossible: boolean;
  updateQuestionRequired: (questionIndex: number) => void;
  isRequired: boolean;
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
    <div className="relative mt-3 rounded-md border bg-white/30 p-4 shadow-sm">
      {isRemovingPossible && (
        <button
          onClick={removeQuestion}
          className="absolute right-0 top-0 translate-x-[50%] translate-y-[-30%] cursor-pointer rounded-full bg-white p-[6px] shadow-md hover:scale-95"
        >
          <TrashIcon className="w-[16px] text-red-700" />
        </button>
      )}

      <div className="flex flex-col items-start gap-2 sm:flex-row sm:gap-4">
        <div className="w-full grow">
          <Input
            placeholder={t('questionPlaceholder')}
            onInput={handleQuestionChange}
            className="mt-2"
            value={questionTitle}
            error={questionError()}
            maxLength={MAX_QUESTION_LENGTH}
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
