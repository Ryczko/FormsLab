import { NextApiRequest, NextApiResponse } from 'next';

import prismadb from '../../../../lib/prismadb';
import { authOptions } from 'pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const requestMethod = req.method;

    const session = await getServerSession(req, res, authOptions);
    const { id } = req.query;

    switch (requestMethod) {
      case 'GET': {
        const survey = await prismadb.survey.findUnique({
          where: {
            id: id as string,
          },
          include: {
            questions: true,
            answers: false,
          },
        });

        return res.status(200).json({ survey });
      }
      case 'POST': {
        const { answersData } = req.body as {
          answersData: { questionId: string; answer: string }[];
        };

        const answer = await prismadb.answer.create({
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
