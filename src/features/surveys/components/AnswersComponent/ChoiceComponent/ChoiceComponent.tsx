import clsx from 'clsx';
import React from 'react';

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
  return (
    <div>
      {options.map((option, idx) => (
        <button
          key={idx}
          className={clsx(
            'mb-2 w-full border p-4 text-center text-sm font-medium',
            answer === option && 'bg-gray-100'
          )}
          onClick={() => handleAnswerChange(option, questionId)}
        >
          {option}
        </button>
      ))}
      {isSubmitted && !answer && isRequired && <p>Required</p>}
    </div>
  );
}
