import React from 'react';
import { SurveyWithQuestions } from 'types/SurveyWithQuestions';
import { useSurveyAnswerManager } from 'features/surveys/features/SurveyDisplay/managers/surveyAnswerManager';
import { SurveyDisplayContext } from 'features/surveys/features/SurveyDisplay/context';
import SurveyDisplayContent from 'features/surveys/features/SurveyDisplay/SurveyDisplayContent';

interface SurveyDisplayProps {
  initialData: SurveyWithQuestions;
}

export default function SurveyDisplay({ initialData }: SurveyDisplayProps) {
  const manager = useSurveyAnswerManager(initialData);

  return (
    <SurveyDisplayContext.Provider value={manager}>
      <SurveyDisplayContent />
    </SurveyDisplayContext.Provider>
  );
}
