import { NextApiRequest, NextApiResponse } from 'next';

import prismadb from '../../../../lib/prismadb';
import { MAX_ANSWER_LENGTH } from 'shared/constants/surveysConfig';

interface AnswerData {
  answersData: { questionId: string; answer?: string }[];
}

export async function getSurveyData(surveyId: string, userId?: string) {
  try {
    const survey = await prismadb.survey.findFirst({
      where: {
        id: surveyId,
        userId,
      },
      include: {
        questions: {
          orderBy: {
            order: 'asc',
          },
        },
        answers: false,
      },
    });

    return survey;
  } catch (error) {
    return null;
  }
}

const isAnswerDataValid = (answerData: AnswerData) => {
  if (
    answerData.answersData.some(
      (answer) => answer.answer && answer.answer.length > MAX_ANSWER_LENGTH
    )
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

    const { id } = req.query;

    const survey = await getSurveyData(id as string);

    switch (requestMethod) {
      case 'GET': {
        return res.status(200).json(survey);
      }
      case 'POST': {
        const { answersData } = req.body as AnswerData;

        if (!isAnswerDataValid(req.body) || !survey?.isActive) {
          return res.status(400).end();
        }

        await prismadb.answer.create({
          data: {
            survey: {
              connect: {
                id: id as string,
              },
            },
            answerData: {
              create: answersData.map((answerData) => ({
                providedAnswer: answerData.answer,
                questionId: answerData.questionId,
              })),
            },
          },
        });

        return res.status(200).end();
      }

      default:
        return res.status(405).end();
    }
  } catch (error) {
    console.error(error);
    res.status(500).end();
  }
}
