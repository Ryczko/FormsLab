import React from 'react';
import EmojiListItem from 'features/surveys/components/AnswersComponent/EmojiListItem/EmojiListItem';
import useTranslation from 'next-translate/useTranslation';

interface ListAnswersComponentProps {
  options: string[];
  handleAnswerChange: (answer: string, questionId: string) => void;
  answer?: string;
  questionId: string;
  isSubmitted: boolean;
  isRequired: boolean;
}

export default function ListAnswersComponent({
  options,
  handleAnswerChange,
  answer,
  questionId,
  isSubmitted,
  isRequired,
}: ListAnswersComponentProps) {
  const { t } = useTranslation('survey');

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
            key={icon}
            onClick={onAnswerChange}
          />
        ))}
      </div>
      {isSubmitted && !answer && isRequired && (
        <p className="mt-4 text-sm text-red-500">{t('requiredField')}</p>
      )}
    </>
  );
}
