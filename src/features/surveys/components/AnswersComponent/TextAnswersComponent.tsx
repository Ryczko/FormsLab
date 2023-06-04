import clsx from 'clsx';
import React, { ChangeEvent } from 'react';
import Input from 'shared/components/Input/Input';
import { MAX_ANSWER_LENGTH } from 'shared/constants/surveysConfig';
import useTranslation from 'next-translate/useTranslation';

interface TextAnswersComponentProps {
  handleAnswerChange: (answer: string, questionId: string) => void;
  answer?: string;
  questionId: string;
  isSubmitted: boolean;
  isRequired: boolean;
}

export default function TextAnswersComponent({
  handleAnswerChange,
  answer,
  questionId,
  isSubmitted,
  isRequired,
}: TextAnswersComponentProps) {
  const { t } = useTranslation('survey');

  const onAnswerChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    handleAnswerChange(e.target.value, questionId);
  };

  const getAnswerError = () => {
    if ((!answer || answer?.trim() === '') && isSubmitted && isRequired) {
      return t('requiredField');
    }
    return undefined;
  };

  return (
    <div>
      <Input
        value={answer}
        onInput={onAnswerChange}
        placeholder="Answer..."
        error={getAnswerError()}
        absoluteError
        className={clsx(getAnswerError() && 'mb-6')}
        maxLength={MAX_ANSWER_LENGTH}
      ></Input>
    </div>
  );
}
