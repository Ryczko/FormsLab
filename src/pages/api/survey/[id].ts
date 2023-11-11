import { NextApiRequest, NextApiResponse } from 'next';

import prismadb from '../../../../lib/prismadb';
import serverAuth from '../../../../lib/serverAuth';

export enum SurveyActionTypes {
  UPDATE_ACTIVE = 'UPDATE_ACTIVE',
}
interface SurveyPatchPayloadI {
  actionType: SurveyActionTypes;
}

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
export async function updateSurveyActiveStatus({
  surveyId,
  isActive,
}: {
  surveyId: string;
  isActive: boolean;
}) {
  const survey = await prismadb.survey.update({
    data: { isActive },
    where: {
      id: surveyId,
    },
  });
  return survey;
}
export async function handlePatch(req: NextApiRequest, res: NextApiResponse) {
  const surveyId = String(req.query.id);
  const { actionType } = req.body as SurveyPatchPayloadI;
  const session = await serverAuth(req, res);
  const userId = session.currentUser.id;
  const surveyFound = await prismadb.survey.findFirst({
    where: { id: surveyId, userId },
  });
  if (!surveyFound?.id) {
    return res.status(404).end();
  }
  switch (actionType) {
    case SurveyActionTypes.UPDATE_ACTIVE: {
      const isActive = !!req.body.isActive;
      const survey = await updateSurveyActiveStatus({
        surveyId,
        isActive,
      });
      if (survey?.id) {
        return res.status(200).json(survey);
      }
      return res.status(500).json({ message: 'Failed to change status' });
    }
    default: {
      return res.status(400).json({ message: 'actionType is invalid' });
    }
  }
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const requestMethod = req.method;
    const session = await serverAuth(req, res);
    const { id } = req.query;

    switch (requestMethod) {
      case 'GET': {
        const survey = await getSurveyWithAnswers(
          id as string,
          session.currentUser.id
        );

        return res.status(200).json(survey);
      }

      case 'DELETE': {
        const survey = await prismadb.survey.findFirst({
          where: {
            id: id as string,
            userId: session.currentUser.id,
          },
        });

        if (!survey) {
          return res.status(404).end();
        }

        await prismadb.survey.delete({
          where: {
            id: id as string,
          },
        });

        return res.status(200).end();
      }
      case 'PATCH': {
        return handlePatch(req, res);
      }
      default:
        return res.status(405).end();
    }
  } catch (error) {
    console.error(error);
    res.status(500).end();
  }
}
