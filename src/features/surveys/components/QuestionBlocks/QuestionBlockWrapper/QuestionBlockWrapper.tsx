import { TrashIcon } from '@heroicons/react/outline';
import { ChangeEvent, PropsWithChildren } from 'react';
import Input from 'shared/components/Input/Input';
import useTranslation from 'next-translate/useTranslation';
import { MAX_QUESTION_LENGTH } from 'shared/constants/surveysConfig';

interface QuestionBlockWrapperProps {
  index: number;
  onQuestionRemove?: (index: number) => void;
  updateQuestion: (newQuestion: string, questionIndex: number) => void;
  questionTitle: string;
  isSubmitted: boolean;
  isRemovingPossible: boolean;
}

export default function QuestionBlockWrapper({
  children,
  index,
  onQuestionRemove,
  updateQuestion,
  questionTitle,
  isSubmitted,
  isRemovingPossible,
}: PropsWithChildren<QuestionBlockWrapperProps>) {
  const { t } = useTranslation('surveyCreate');

  const removeQuestion = () => {
    onQuestionRemove?.(index);
  };

  const handleQuestionChange = (e: ChangeEvent<HTMLInputElement>) => {
    updateQuestion(e.target.value, index);
  };

  const questionError = () => {
    if (isSubmitted && questionTitle.length === 0) {
      return t('required');
    }

    return undefined;
  };

  return (
    <div className="relative my-6 rounded-md border bg-white/30 p-4 shadow-sm">
      {isRemovingPossible && (
        <button
          onClick={removeQuestion}
          className="absolute right-0 top-0 translate-x-[50%] translate-y-[-50%] cursor-pointer rounded-full bg-white p-2 shadow-md hover:scale-95"
        >
          <TrashIcon className="w-[18px] text-red-700" />
        </button>
      )}

      <Input
        placeholder="Question..."
        onInput={handleQuestionChange}
        className="mt-2"
        value={questionTitle}
        error={questionError()}
        absoluteError
        maxLength={MAX_QUESTION_LENGTH}
      />
      {children}
    </div>
  );
}
