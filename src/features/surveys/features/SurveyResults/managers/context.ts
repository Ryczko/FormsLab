import { createContext } from 'react';
import { useDefinedContext } from 'shared/context/useDefinedContext';
import { SurveyResultsManager } from 'features/surveys/features/SurveyResults/managers/surveyResultsManager';

export const SurveyResultsContext = createContext<
  SurveyResultsManager | undefined
>(undefined);

export const useSurveyResultsContext = (): SurveyResultsManager =>
  useDefinedContext(SurveyResultsContext);
