import { DraftQuestion } from 'features/surveys/features/SurveyCreator/managers/createSurveyManager/createSurveyManager';

export const getAvailableJumps = (
  questions: DraftQuestion[],
  questionData: DraftQuestion
) => {
  // TODO: handle in the future
  // const endOfSurveyStep = {
  //   title: 'End of survey',
  //   draftId: 'END_OF_SURVEY',
  // };

  const availableQuestions = questions.filter(
    (question) => question.draftId !== questionData.draftId
  );

  const allAvailableSteps = [...availableQuestions];

  const namesWithValues = allAvailableSteps.map((step) => ({
    name: step.title,
    value: step.draftId,
  }));

  return namesWithValues;
};
