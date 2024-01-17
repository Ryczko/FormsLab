import { createContext } from 'react';
import { useDefinedContext } from 'shared/context/useDefinedContext';
import { SurveyAnswerManager } from 'features/surveys/features/SurveyDisplay/managers/surveyAnswerManager';

export const SurveyDisplayContext = createContext<
  SurveyAnswerManager | undefined
>(undefined);

export const useSurveyDisplayContext = (): SurveyAnswerManager =>
  useDefinedContext(SurveyDisplayContext);
