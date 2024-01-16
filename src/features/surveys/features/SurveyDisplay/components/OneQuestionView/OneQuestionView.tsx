import { SurveyWithQuestionsAndUsersAnswers } from 'features/surveys/features/SurveyDisplay/managers/surveyAnswerManager';
import React from 'react';
import Header from 'shared/components/Header/Header';
import Progressbar from 'shared/components/ProgressBar/ProgressBar';
import { AnswersComponentFactory } from 'features/surveys/features/SurveyDisplay/components/AnswersComponent/AnswersComponentFactory';

interface OneQuestionViewProps {
  formData: SurveyWithQuestionsAndUsersAnswers;
  activeQuestionIndex: number;
  isSubmitted: boolean;
  handleAnswerChange: (questionId: string, answer: string) => void;
  handleNextQuestion: () => void;
  handlePreviousQuestion: () => void;
  isAnswering: boolean;
}

export default function OneQuestionView({
  activeQuestionIndex,
  formData,
  handleNextQuestion,
  handleAnswerChange,
  handlePreviousQuestion,
  isSubmitted,
  isAnswering,
}: OneQuestionViewProps) {
  const currentQuestion = formData?.questions[activeQuestionIndex];
  const isLastQuestion = activeQuestionIndex === formData?.questions.length - 1;

  return (
    <>
      {formData?.displayTitle && <Header>{formData?.title}</Header>}

      <AnswersComponentFactory
        key={currentQuestion.id}
        question={currentQuestion.title}
        type={currentQuestion.type}
        options={currentQuestion.options}
        answer={currentQuestion.answer}
        questionId={currentQuestion.id}
        handleAnswerChange={handleAnswerChange}
        isSubmitted={isSubmitted}
        isRequired={currentQuestion.isRequired}
        goToNextQuestion={handleNextQuestion}
        handlePreviousQuestion={handlePreviousQuestion}
        activeQuestionIndex={activeQuestionIndex}
        isLastQuestion={isLastQuestion}
        isAnswering={isAnswering}
      />

      <Progressbar
        currentStep={activeQuestionIndex + 1}
        totalSteps={formData?.questions.length}
        isSubmitted={isAnswering}
      />
    </>
  );
}
