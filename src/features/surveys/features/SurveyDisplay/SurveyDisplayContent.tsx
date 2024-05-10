import React from 'react';
import { useSurveyDisplayContext } from 'features/surveys/features/SurveyDisplay/context';
import OneQuestionView from 'features/surveys/features/SurveyDisplay/components/OneQuestionView/OneQuestionView';
import AllQuestionsView from 'features/surveys/features/SurveyDisplay/components/AllQuestionsView/AllQuestionsView';
import SurveyNoActive from 'features/surveys/features/SurveyDisplay/components/SurveyNoActive/SurveyNoActive';
import ThankYou from 'features/surveys/features/SurveyDisplay/components/ThankYou';
import clsx from 'clsx';

export default function SurveyDisplayContent() {
  const { formData, isSurveyFinished, previewMode } = useSurveyDisplayContext();

  return (
    <div className="w-full">
      {isSurveyFinished ? (
        <div className={clsx(previewMode && 'mb-12 mt-6')}>
          <ThankYou />
        </div>
      ) : formData?.isActive ? (
        formData.oneQuestionPerStep ? (
          <OneQuestionView />
        ) : (
          <AllQuestionsView />
        )
      ) : (
        <SurveyNoActive />
      )}
    </div>
  );
}
