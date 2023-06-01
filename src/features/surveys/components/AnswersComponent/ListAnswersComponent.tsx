import React from 'react';
import EmojiListItem from 'features/surveys/components/AnswersComponent/EmojiListItem/EmojiListItem';
import { QuestionType } from '@prisma/client';

interface ListAnswersComponentProps {
  type: QuestionType;
  options: string[];
  handleAnswerChange: (answer: string, questionId: string) => void;
  answer?: string;
  questionId: string;
  isSubmitted: boolean;
}

export default function ListAnswersComponent({
  type,
  options,
  handleAnswerChange,
  answer,
  questionId,
  isSubmitted,
}: ListAnswersComponentProps) {
  const onAnswerChange = (answer: string) => {
    handleAnswerChange(answer, questionId);
  };

  return (
    <>
      <div className="mb-2 flex flex-wrap justify-center gap-y-2">
        {options.map((icon, idx) => (
          <EmojiListItem
            icon={icon}
            selected={answer === icon}
            isAnySelected={!!answer}
            key={idx}
            onClick={onAnswerChange}
          />
        ))}
      </div>
      {isSubmitted && !answer && (
        <p className="mt-4 text-sm text-red-500">Please select an answer</p>
      )}
    </>
  );
}
