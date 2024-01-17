import React from 'react';
import useTranslation from 'next-translate/useTranslation';
import EmojiListItem from 'features/surveys/features/SurveyDisplay/components/AnswersComponent/EmojiListItem/EmojiListItem';
import { DraftQuestionWithAnswer } from 'features/surveys/features/SurveyDisplay/managers/surveyAnswerManager';
import { useSurveyDisplayContext } from 'features/surveys/features/SurveyDisplay/context';

interface ListAnswersComponentProps {
  questionData: DraftQuestionWithAnswer;
}

export default function ListAnswersComponent({
  questionData,
}: ListAnswersComponentProps) {
  const { t } = useTranslation('survey');

  const { handleAnswerChange, isSubmitted } = useSurveyDisplayContext();

  const onAnswerChange = (answer: string) => {
    handleAnswerChange(answer, questionData.id);
  };

  return (
    <>
      <div className="mb-2 flex flex-wrap justify-center gap-y-2">
        {questionData.options.map((icon, idx) => (
          <EmojiListItem
            icon={icon}
            selected={questionData.answer === icon}
            isAnySelected={!!questionData.answer}
            key={icon}
            onClick={onAnswerChange}
          />
        ))}
      </div>
      {isSubmitted && !questionData.answer && questionData.isRequired && (
        <p className="mt-4 text-sm text-red-500">{t('requiredField')}</p>
      )}
    </>
  );
}
