import { NextApiRequest, NextApiResponse } from 'next';

import prismadb from '../../../../lib/prismadb';

import serverAuth from '../../../../lib/serverAuth';
import { LogicPath, Question } from '@prisma/client';
import {
  MAX_QUESTIONS,
  MAX_QUESTION_LENGTH,
  MAX_TITLE_LENGTH,
  MIN_QUESTIONS,
} from 'shared/constants/surveysConfig';

export interface SurveyData {
  title: string;
  description: string;
  questions: ({ draftId: string; logicPaths: LogicPath[] } & Question)[];
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

export const isSurveyValid = (survey: SurveyData) => {
  if (
    survey.title.trim() === '' ||
    survey.title.length > MAX_TITLE_LENGTH ||
    survey.questions.some(
      (question) =>
        question.title.trim() === '' ||
        question.title.length > MAX_QUESTION_LENGTH
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
          questions,
          oneQuestionPerStep,
          displayTitle,
          hideProgressBar,
          accentColor,
        } = req.body as SurveyData;

        console.log('req.body', questions);

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
              create: questions.map((question, index) => ({
                type: question.type,
                title: question.title,
                description: question.description,
                options: question.options,
                isRequired: question.isRequired,
                order: index,
              })),
            },
          },
        });

        const createdQuestions = await prismadb.question.findMany({
          where: {
            surveyId: survey.id,
          },
        });

        console.log('result', createdQuestions);

        //create logic paths to questions
        for (let i = 0; i < questions.length; i++) {
          const question = questions[i];
          for (let j = 0; j < question.logicPaths.length; j++) {
            const path = question.logicPaths[j];
            await prismadb.logicPath.create({
              data: {
                comparisonType: path.comparisonType,
                selectedOption: path.selectedOption,
                nextQuestionId: path.nextQuestionId,
                question: {
                  connect: {
                    id: createdQuestions[i].id,
                  },
                },
              },
            });
          }
        }

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
