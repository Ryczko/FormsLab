import { QuestionType } from '@prisma/client';
import { Question } from 'features/surveys/features/SurveyCreator/managers/createSurveyManager/createSurveyManager';
import { v4 } from 'uuid';

export const MAX_TITLE_LENGTH = 255;

export const MAX_QUESTIONS = 10;
export const MIN_QUESTIONS = 0;

export const MAX_OPTIONS = 6;
export const MIN_OPTIONS = 2;

export const MAX_QUESTION_LENGTH = 255;
export const MAX_ANSWER_LENGTH = 255;

export const defaultQuestions: Question[] = [
  {
    id: v4(),
    title: 'How are you feeling today?',
    options: [
      ':rage:',
      ':slightly_frowning_face:',
      ':slightly_smiling_face:',
      ':smiley:',
    ],
    type: QuestionType.EMOJI,
    isRequired: true,
    expanded: true,
  },
  {
    id: v4(),
    title: 'Tell us more',
    type: QuestionType.INPUT,
    isRequired: true,
    expanded: false,
  },
];
