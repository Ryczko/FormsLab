import React from 'react';
import { SurveyWithQuestions } from 'types/SurveyWithQuestions';
import { useSurveyAnswerManager } from 'features/surveys/features/SurveyDisplay/managers/surveyAnswerManager';
import useTranslation from 'next-translate/useTranslation';
import AllQuestionsView from 'features/surveys/features/SurveyDisplay/components/AllQuestionsView/AllQuestionsView';
import OneQuestionView from 'features/surveys/features/SurveyDisplay/components/OneQuestionView/OneQuestionView';

interface SurveyDisplayProps {
  initialData: SurveyWithQuestions;
}

export default function SurveyDisplay({ initialData }: SurveyDisplayProps) {
  const { t } = useTranslation('survey');

  const {
    handleAnswerChange,
    handleSave,
    isAnswering,
    formData,
    isSubmitted,
    activeQuestionIndex,
    handleNextQuestion,
    handlePreviousQuestion,
  } = useSurveyAnswerManager(initialData);

  return (
    <>
      <div className="w-full">
        {formData?.isActive ? (
          formData.oneQuestionPerStep ? (
            <OneQuestionView
              activeQuestionIndex={activeQuestionIndex}
              formData={formData}
              handleNextQuestion={handleNextQuestion}
              handlePreviousQuestion={handlePreviousQuestion}
              isSubmitted={isSubmitted}
              handleAnswerChange={handleAnswerChange}
              isAnswering={isAnswering}
            />
          ) : (
            <AllQuestionsView
              formData={formData}
              handleSave={handleSave}
              handleAnswerChange={handleAnswerChange}
              isAnswering={isAnswering}
              isSubmitted={isSubmitted}
            />
          )
        ) : (
          <>
            <div className="text-5xl">🙁</div>
            <div className="my-5 text-xl">{t('surveyNoLongerActive')}</div>
          </>
        )}
      </div>
    </>
  );
}
