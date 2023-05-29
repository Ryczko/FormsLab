import { NextApiRequest, NextApiResponse } from 'next';

import prismadb from '../../../../lib/prismadb';
import serverAuth from '../../../../lib/serverAuth';

export async function getSurveyWithAnswers(surveyId: string, userId: string) {
  const survey = await prismadb.survey.findFirst({
    where: {
      id: surveyId,
      userId: userId,
    },
    include: {
      questions: true,
      answers: {
        include: {
          answerData: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      },
    },
  });

  return survey;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const requestMethod = req.method;
    const session = await serverAuth(req, res);

    switch (requestMethod) {
      case 'GET': {
        const { id } = req.query;
        const survey = await getSurveyWithAnswers(
          id as string,
          session.currentUser.id
        );

        return res.status(200).json(survey);
      }

      default:
        return res.status(405).end();
    }
  } catch (error) {
    console.error(error);
    res.status(500).end();
  }
}
