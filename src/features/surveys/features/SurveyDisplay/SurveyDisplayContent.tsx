import React from 'react';
import { useSurveyDisplayContext } from 'features/surveys/features/SurveyDisplay/context';
import OneQuestionView from 'features/surveys/features/SurveyDisplay/components/OneQuestionView/OneQuestionView';
import AllQuestionsView from 'features/surveys/features/SurveyDisplay/components/AllQuestionsView/AllQuestionsView';
import SurveyNoActive from 'features/surveys/features/SurveyDisplay/components/SurveyNoActive/SurveyNoActive';
import Note from 'shared/components/Note/Note';
import clsx from 'clsx';

export default function SurveyDisplayContent() {
  const { formData, previewMode } = useSurveyDisplayContext();

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

      {previewMode && (
        <div className={clsx(formData.questions.length > 0 && 'my-4')}>
          <Note
            title="Preview mode"
            classNames="text-center"
            description="You can not submit a response in preview mode"
          />
        </div>
      )}
    </div>
  );
}
