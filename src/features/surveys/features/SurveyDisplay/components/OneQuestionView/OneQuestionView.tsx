import React from 'react';
import Header from 'shared/components/Header/Header';
import Progressbar from 'shared/components/ProgressBar/ProgressBar';
import { AnswersComponentFactory } from 'features/surveys/features/SurveyDisplay/components/AnswersComponent/AnswersComponentFactory';
import { useSurveyDisplayContext } from 'features/surveys/features/SurveyDisplay/context';
import { useSurveyCreatorContext } from 'features/surveys/features/SurveyCreator/managers/createSurveyManager/context';

export default function OneQuestionView() {
  const { isAnswering, formData, activeQuestionIndex } =
    useSurveyDisplayContext();

  const { surveyOptions } = useSurveyCreatorContext();

  return (
    <>
      {formData?.displayTitle && (
        <Header>{formData?.title.trim() || '-'}</Header>
      )}

      {formData.questions.length > 0 && (
        <>
          <AnswersComponentFactory questionIndex={activeQuestionIndex} />
          {!surveyOptions.hideProgressBar ? (
            <Progressbar
              currentStep={activeQuestionIndex + 1}
              totalSteps={formData?.questions.length}
              isSubmitted={isAnswering}
            />
          ) : (
            <></>
          )}
        </>
      )}
    </>
  );
}
