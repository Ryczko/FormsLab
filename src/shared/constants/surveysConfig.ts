import { QuestionType } from '@prisma/client';
import { DraftQuestion } from 'features/surveys/features/SurveyCreator/managers/createSurveyManager/createSurveyManager';
import { v4 } from 'uuid';

export const END_OF_SURVEY = 'END_OF_SURVEY';

export const MAX_TITLE_LENGTH = 255;

export const MAX_QUESTIONS = 10;
export const MIN_QUESTIONS = 0;

export const MAX_OPTIONS = 8;
export const MIN_OPTIONS = 2;

export const MAX_LOGIC_PATHS = 8;

export const MAX_QUESTION_LENGTH = 255;
export const MAX_ANSWER_LENGTH = 255;

export const defaultQuestions: DraftQuestion[] = [
  {
    draftId: v4(),
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
    advancedSettingsExpanded: false,
  },
  {
    draftId: v4(),
    title: 'Tell us more',
    type: QuestionType.INPUT,
    isRequired: false,
    expanded: false,
    advancedSettingsExpanded: false,
  },
];
