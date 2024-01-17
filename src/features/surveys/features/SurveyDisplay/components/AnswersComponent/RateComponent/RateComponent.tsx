import React, { useState } from 'react';
import useTranslation from 'next-translate/useTranslation';
import clsx from 'clsx';
import StarComponent from 'features/surveys/features/SurveyDisplay/components/AnswersComponent/RateComponent/StarComponent/StarComponent';
import { useSurveyDisplayContext } from 'features/surveys/features/SurveyDisplay/context';
import { DraftQuestionWithAnswer } from 'features/surveys/features/SurveyDisplay/managers/surveyAnswerManager';

interface RateAnswersComponentProps {
  questionData: DraftQuestionWithAnswer;
}

export default function RateAnswersComponent({
  questionData,
}: RateAnswersComponentProps) {
  const { t } = useTranslation('survey');

  const { handleAnswerChange, isSubmitted } = useSurveyDisplayContext();

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <>
      <div className="flex items-center justify-center">
        {[...Array(5)].map((_, index) => (
          <StarComponent
            key={index}
            classNames={clsx(
              questionData.answer && index < +questionData.answer
                ? 'text-yellow-400'
                : 'text-gray-300',
              hoveredIndex !== null
                ? hoveredIndex >= index
                  ? '!text-yellow-400'
                  : '!text-gray-300'
                : ''
            )}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            onClick={() =>
              handleAnswerChange((index + 1).toString(), questionData.id)
            }
          />
        ))}
      </div>
      {isSubmitted && !questionData.answer && questionData.isRequired && (
        <p className="mt-4 text-sm text-red-500">{t('requiredField')}</p>
      )}
    </>
  );
}
