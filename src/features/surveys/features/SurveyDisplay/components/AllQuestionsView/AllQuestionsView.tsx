import { SurveyWithQuestionsAndUsersAnswers } from 'features/surveys/features/SurveyDisplay/managers/surveyAnswerManager';
import React from 'react';
import Header from 'shared/components/Header/Header';
import Button, {
  ButtonSize,
  ButtonVariant,
} from 'shared/components/Button/Button';
import useTranslation from 'next-translate/useTranslation';
import { AnswersComponentFactory } from 'features/surveys/features/SurveyDisplay/components/AnswersComponent/AnswersComponentFactory';

interface AllQuestionsViewProps {
  formData: SurveyWithQuestionsAndUsersAnswers;
  handleSave: () => Promise<void>;
  isAnswering: boolean;
  isSubmitted: boolean;
  handleAnswerChange: (questionId: string, answer: string) => void;
}

export default function AllQuestionView({
  formData,
  handleSave,
  handleAnswerChange,
  isAnswering,
  isSubmitted,
}: AllQuestionsViewProps) {
  const { t } = useTranslation('survey');

  return (
    <>
      {formData?.displayTitle && <Header>{formData?.title}</Header>}

      {formData?.questions.map((question) => {
        return (
          <AnswersComponentFactory
            key={question.id}
            question={question.title}
            type={question.type}
            options={question.options}
            answer={question.answer}
            questionId={question.id}
            handleAnswerChange={handleAnswerChange}
            isSubmitted={isSubmitted}
            isRequired={question.isRequired}
          />
        );
      })}

      <div className="flex justify-center">
        <Button
          onClick={handleSave}
          variant={ButtonVariant.PRIMARY}
          sizeType={ButtonSize.FULL}
          isLoading={isAnswering}
        >
          {t('sendButton')}
        </Button>
      </div>
    </>
  );
}
