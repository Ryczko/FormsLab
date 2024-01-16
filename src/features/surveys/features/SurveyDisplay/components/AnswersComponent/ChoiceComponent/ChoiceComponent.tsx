import clsx from 'clsx';
import React from 'react';
import useTranslation from 'next-translate/useTranslation';

interface ChoiceComponentProps {
  options: string[];
  handleAnswerChange: (answer: string, questionId: string) => void;
  answer?: string;
  questionId: string;
  isSubmitted: boolean;
  isRequired: boolean;
}

export default function ChoiceComponent({
  handleAnswerChange,
  isRequired,
  isSubmitted,
  options,
  questionId,
  answer,
}: ChoiceComponentProps) {
  const { t } = useTranslation('survey');

  return (
    <div>
      {options.map((option, idx) => (
        <button
          key={idx}
          className={clsx(
            'mb-2 w-full rounded border p-4 text-center text-sm font-medium hover:bg-gray-100',
            answer === option && 'bg-gray-200'
          )}
          onClick={() => handleAnswerChange(option, questionId)}
        >
          {option}
        </button>
      ))}
      {isSubmitted && !answer && isRequired && (
        <p className="mt-2 text-sm text-red-500">{t('requiredField')}</p>
      )}
    </div>
  );
}
