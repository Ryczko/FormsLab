import React, { ChangeEvent } from 'react';
import Input from 'shared/components/Input/Input';
import { MAX_ANSWER_LENGTH } from 'shared/constants/surveysConfig';
import useTranslation from 'next-translate/useTranslation';
import { DraftQuestionWithAnswer } from 'features/surveys/features/SurveyDisplay/managers/surveyAnswerManager';
import { useSurveyDisplayContext } from 'features/surveys/features/SurveyDisplay/context';

interface TextAnswersComponentProps {
  questionData: DraftQuestionWithAnswer;
}

export default function TextAnswersComponent({
  questionData,
}: TextAnswersComponentProps) {
  const { t } = useTranslation('survey');

  const { handleAnswerChange, isSubmitted } = useSurveyDisplayContext();

  const onAnswerChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    handleAnswerChange(e.target.value, questionData.id);
  };

  const getAnswerError = () => {
    if (
      (!questionData.answer || questionData.answer?.trim() === '') &&
      isSubmitted &&
      questionData.isRequired
    ) {
      return t('requiredField');
    }
    return undefined;
  };

  return (
    <div>
      <Input
        value={questionData.answer}
        onInput={onAnswerChange}
        placeholder="Answer..."
        error={getAnswerError()}
        centeredError
        maxLength={MAX_ANSWER_LENGTH}
      ></Input>
    </div>
  );
}
