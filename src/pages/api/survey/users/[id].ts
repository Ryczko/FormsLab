import { NextApiRequest, NextApiResponse } from 'next';

import prismadb from '../../../../../lib/prismadb';

export async function getUserName(userId: string | null) {
  if(userId === null) return '';

  const user = await prismadb.user.findFirst({
    where: {
      id: userId
    },
  });

  return user?.name ?? '';
}

export async function getUsersById(surveyId: string) {
    
  const answers = await prismadb.answer.findMany({
    where: {
      surveyId: surveyId
    },
  });

  //if(answers === ) return [];

  const allUserIds = answers.map(item => item.userId);
  const userNames = new Set<string>();

  for (const userId of allUserIds){
    const userName = await getUserName(userId);
    if(userName !== '') userNames.add(userName);
  }

  const uniqueUserNames = Array.from(userNames);
  return uniqueUserNames;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const requestMethod = req.method;
    const { id } = req.query;

    switch (requestMethod) {
      case 'GET': {
        const users = await getUsersById(
          id as string,
        );
        return res.status(200).json(users);
      }
      default:
        return res.status(405).end();
    }
  } catch (error) {
    console.error(error);
    res.status(500).end();
  }
}