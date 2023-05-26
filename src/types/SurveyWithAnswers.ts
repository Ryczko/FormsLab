import { Answer, AnswerData, Question, Survey } from '@prisma/client';

export type SurveyWithAnswers = Survey & {
  answers: (Answer & {
    answerData: AnswerData[];
  })[];
  questions: Question[];
};
