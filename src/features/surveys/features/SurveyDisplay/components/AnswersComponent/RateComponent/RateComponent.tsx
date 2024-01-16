import React, { useState } from 'react';
import useTranslation from 'next-translate/useTranslation';
import clsx from 'clsx';
import StarComponent from 'features/surveys/features/SurveyDisplay/components/AnswersComponent/RateComponent/StarComponent/StarComponent';

interface RateAnswersComponentProps {
  handleAnswerChange: (answer: string, questionId: string) => void;
  answer?: string;
  questionId: string;
  isSubmitted: boolean;
  isRequired: boolean;
}

export default function RateAnswersComponent({
  handleAnswerChange,
  answer,
  questionId,
  isSubmitted,
  isRequired,
}: RateAnswersComponentProps) {
  const { t } = useTranslation('survey');

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <>
      <div className="flex items-center justify-center">
        {[...Array(5)].map((_, index) => (
          <StarComponent
            key={index}
            classNames={clsx(
              answer && index < +answer ? 'text-yellow-400' : 'text-gray-300',
              hoveredIndex !== null
                ? hoveredIndex >= index
                  ? '!text-yellow-400'
                  : '!text-gray-300'
                : ''
            )}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            onClick={() =>
              handleAnswerChange((index + 1).toString(), questionId)
            }
          />
        ))}
      </div>
      {isSubmitted && !answer && isRequired && (
        <p className="mt-4 text-sm text-red-500">{t('requiredField')}</p>
      )}
    </>
  );
}
