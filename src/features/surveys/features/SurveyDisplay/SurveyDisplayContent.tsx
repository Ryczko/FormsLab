import React from 'react';
import { useSurveyDisplayContext } from 'features/surveys/features/SurveyDisplay/context';
import OneQuestionView from 'features/surveys/features/SurveyDisplay/components/OneQuestionView/OneQuestionView';
import AllQuestionsView from 'features/surveys/features/SurveyDisplay/components/AllQuestionsView/AllQuestionsView';
import SurveyNoActive from 'features/surveys/features/SurveyDisplay/components/SurveyNoActive/SurveyNoActive';

export default function SurveyDisplayContent() {
  const { formData } = useSurveyDisplayContext();

  return (
    <div className="w-full">
      {formData?.isActive ? (
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
