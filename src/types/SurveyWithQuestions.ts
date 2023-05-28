import { Question, Survey } from '@prisma/client';

export type SurveyWithQuestions = Survey & {
  questions: Question[];
};
