import { NextApiRequest, NextApiResponse } from 'next';

import prismadb from '../../../../lib/prismadb';

import serverAuth from '../../../../lib/serverAuth';
import { Question } from '@prisma/client';

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
  });

  return surveys;
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
        const surveys = await getAllUserSurveys(session.currentUser.id);
        return res.status(200).json({ surveys });
      }
      case 'POST': {
        const { title, description, questions } = req.body as {
          title: string;
          description: string;
          questions: Question[];
        };

        const survey = await prismadb.survey.create({
          data: {
            user: { connect: { id: session.currentUser.id } },
            title,
            description,
            isActive: true,
            questions: {
              create: questions.map((question) => ({
                type: question.type,
                title: question.title,
                description: question.description,
                options: question.options,
                isRequired: true,
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
