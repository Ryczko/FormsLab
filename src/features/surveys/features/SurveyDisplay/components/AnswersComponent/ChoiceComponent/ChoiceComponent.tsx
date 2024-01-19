import clsx from 'clsx';
import React from 'react';
import useTranslation from 'next-translate/useTranslation';
import { DraftQuestionWithAnswer } from 'features/surveys/features/SurveyDisplay/managers/surveyAnswerManager';
import { useSurveyDisplayContext } from 'features/surveys/features/SurveyDisplay/context';

interface ChoiceComponentProps {
  questionData: DraftQuestionWithAnswer;
}

export default function ChoiceComponent({
  questionData,
}: ChoiceComponentProps) {
  const { t } = useTranslation('survey');

  const { handleAnswerChange, isSubmitted } = useSurveyDisplayContext();

  return (
    <div>
      {questionData.options.map((option, idx) => (
        <button
          key={idx}
          className={clsx(
            'mb-2 w-full rounded border p-4 text-center text-sm font-medium hover:bg-gray-100',
            questionData.answer === option && 'bg-gray-200'
          )}
          onClick={() => handleAnswerChange(option, questionData.id)}
        >
          {option.trim() || '-'}
        </button>
      ))}
      {isSubmitted && !questionData.answer && questionData.isRequired && (
        <p className="mt-2 text-sm text-red-500">{t('requiredField')}</p>
      )}
    </div>
  );
}
