import { QuestionType } from '@prisma/client';
import { MappedAnswerData } from 'types/MappedAnswerData';

export type MappedAnswers = {
  [key: string]: {
    questionType: QuestionType;
    question: string;
    options: string[];
    answers: MappedAnswerData[];
  };
};
