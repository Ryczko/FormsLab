import { QuestionType } from '@prisma/client';
import { Question } from 'features/surveys/managers/createSurveyManager';
import { v4 } from 'uuid';

export const MAX_TITLE_LENGTH = 255;

export const MAX_QUESTIONS = 10;
export const MIN_QUESTIONS = 1;

export const MAX_OPTIONS = 6;
export const MIN_OPTIONS = 2;

export const MAX_QUESTION_LENGTH = 255;
export const MAX_ANSWER_LENGTH = 255;

export const defaultQuestions: Question[] = [
  {
    id: v4(),
    title: '',
    options: [
      ':smiley:',
      ':slightly_smiling_face:',
      ':slightly_frowning_face:',
      ':rage:',
    ],
    type: QuestionType.EMOJI,
    isRequired: true,
  },
  {
    id: v4(),
    title: '',
    type: QuestionType.INPUT,
    isRequired: false,
  },
];
