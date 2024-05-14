import { DraftQuestion } from 'features/surveys/features/SurveyCreator/managers/createSurveyManager/createSurveyManager';
import { END_OF_SURVEY } from 'shared/constants/surveysConfig';

export const getAvailableJumps = (
  questions: DraftQuestion[],
  questionData: DraftQuestion
) => {
  const availableQuestions = questions.filter(
    (question) => question.draftId !== questionData.draftId
  );

  const allAvailableSteps = [...availableQuestions];

  const namesWithValues = allAvailableSteps.map((step) => ({
    name: step.title,
    value: step.draftId,
  }));

  namesWithValues.push({
    name: 'End of survey',
    value: END_OF_SURVEY,
  });

  return namesWithValues;
};
