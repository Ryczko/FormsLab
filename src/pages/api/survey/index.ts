import { NextApiRequest, NextApiResponse } from 'next';

import prismadb from '../../../../lib/prismadb';

import serverAuth from '../../../../lib/serverAuth';
import { ComparisonType, QuestionType } from '@prisma/client';
import {
  MAX_LOGIC_PATHS,
  MAX_QUESTIONS,
  MAX_QUESTION_LENGTH,
  MAX_TITLE_LENGTH,
  MIN_QUESTIONS,
} from 'shared/constants/surveysConfig';

export interface CreateEditSurveyPayload {
  title: string;
  description?: string;
  questions: {
    draftId?: string;
    title: string;
    type: QuestionType;
    description?: string;
    isRequired: boolean;
    options: string[];
    logicPaths?: {
      comparisonType: ComparisonType;
      selectedOption: string;
      nextQuestionOrder: number;
    }[];
  }[];
  oneQuestionPerStep: boolean;
  displayTitle: boolean;
  hideProgressBar: boolean;
  accentColor: string;
}

export async function getAllUserSurveys(userId: string) {
  const surveys = await prismadb.survey.findMany({
    where: {
      user: {
        id: userId,
      },
    },
    include: {
      questions: false,
      answers: false,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return surveys;
}

export const isSurveyValid = (survey: CreateEditSurveyPayload) => {
  if (
    survey.title.trim() === '' ||
    survey.title.length > MAX_TITLE_LENGTH ||
    survey.questions.some(
      (question) =>
        question.title.trim() === '' ||
        question.title.length > MAX_QUESTION_LENGTH
    ) ||
    survey.questions.some(
      (question) =>
        question.logicPaths && question.logicPaths.length > MAX_LOGIC_PATHS
    ) ||
    survey.questions.length < MIN_QUESTIONS ||
    survey.questions.length > MAX_QUESTIONS
  ) {
    return false;
  }

  return true;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const requestMethod = req.method;
    const session = await serverAuth(req, res);

    switch (requestMethod) {
      case 'GET': {
        const surveys = await getAllUserSurveys(session.currentUser.id);
        return res.status(200).json({ surveys });
      }
      case 'POST': {
        const {
          title,
          description,
          questions: payloadQuestions,
          oneQuestionPerStep,
          displayTitle,
          hideProgressBar,
          accentColor,
        } = req.body as CreateEditSurveyPayload;

        if (!isSurveyValid(req.body)) {
          return res.status(400).end();
        }

        const survey = await prismadb.survey.create({
          data: {
            user: { connect: { id: session.currentUser.id } },
            title,
            description,
            accentColor,
            isActive: true,
            oneQuestionPerStep,
            displayTitle,
            hideProgressBar,
            questions: {
              create: payloadQuestions.map((question, index) => ({
                type: question.type,
                title: question.title,
                description: question.description,
                options: question.options,
                isRequired: question.isRequired,
                order: index,
              })),
            },
          },
          include: {
            questions: true,
          },
        });

        // Adding logic paths is seperated because we need all questions to be created first
        survey.questions.forEach(async (question) => {
          const payloadQuestion = payloadQuestions[question.order];
          const logicPaths = payloadQuestion.logicPaths?.map((path) => {
            const nextQuestionId = survey.questions.find(
              (q) => q.order === path.nextQuestionOrder
            )?.id;

            return {
              comparisonType: path.comparisonType,
              selectedOption: path.selectedOption,
              nextQuestionId,
              endSurvey: !nextQuestionId || undefined,
            };
          });

          await prismadb.question.update({
            where: { id: question.id },
            data: {
              logicPaths: logicPaths,
            },
          });
        });

        return res.status(200).json({ id: survey.id });
      }
      default:
        return res.status(405).end();
    }
  } catch (error) {
    console.error(error);
    res.status(500).end();
  }
}
