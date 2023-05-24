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

    switch (requestMethod) {
      case 'GET': {
        const surveys = await prismadb.survey.findMany({
          where: {
            user: {
              id: session?.user?.id,
            },
          },
          include: {
            questions: false,
            answers: false,
          },
        });

        return res.status(200).json({ surveys });
      }
      case 'POST': {
        const { title, description, questions } = req.body;

        const survey = await prismadb.survey.create({
          data: {
            user: { connect: { id: session?.user?.id } },
            title,
            description,
            isActive: true,
            questions: {
              create: questions.map((question: any) => ({
                type: question.type,
                title: question.title,
                description: question.description,
                options: { set: question.options },
              })),
            },
          },
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
