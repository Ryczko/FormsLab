import { NextApiRequest, NextApiResponse } from 'next';

import prismadb from '../../../../lib/prismadb';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const requestMethod = req.method;

    switch (requestMethod) {
      case 'GET': {
        const { id } = req.query;

        const survey = await prismadb.survey.findUnique({
          where: {
            id: id as string,
          },
          include: {
            questions: true,
            answers: {
              include: {
                answerData: true,
              },
            },
          },
        });

        return res.status(200).json({ survey });
      }

      default:
        return res.status(405).end();
    }
  } catch (error) {
    console.error(error);
    res.status(500).end();
  }
}
