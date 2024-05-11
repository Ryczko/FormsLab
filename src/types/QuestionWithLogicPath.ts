import { LogicPath, Question } from '@prisma/client';

export type QuestionWithLogicPath = Question & {
  logicPaths: LogicPath[];
};
