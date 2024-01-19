import React from 'react';
import { SurveyWithQuestions } from 'types/SurveyWithQuestions';
import { useSurveyAnswerManager } from 'features/surveys/features/SurveyDisplay/managers/surveyAnswerManager';
import { SurveyDisplayContext } from 'features/surveys/features/SurveyDisplay/context';
import SurveyDisplayContent from 'features/surveys/features/SurveyDisplay/SurveyDisplayContent';

interface SurveyDisplayProps {
  initialData: SurveyWithQuestions;
  previewMode?: boolean;
}

export default function SurveyDisplay({
  initialData,
  previewMode = false,
}: SurveyDisplayProps) {
  const manager = useSurveyAnswerManager(initialData, previewMode);

  return (
    <SurveyDisplayContext.Provider value={manager}>
      <SurveyDisplayContent />
    </SurveyDisplayContext.Provider>
  );
}
