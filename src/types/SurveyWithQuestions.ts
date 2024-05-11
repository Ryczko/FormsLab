import { Survey } from '@prisma/client';
import { QuestionWithLogicPath } from 'types/QuestionWithLogicPath';

export type SurveyWithQuestions = Survey & {
  questions: QuestionWithLogicPath[];
};
