import { useState, useEffect } from 'react';
import { getFetch } from '../../../lib/axiosConfig';
import { User } from '@prisma/client';

import data from '@emoji-mart/data/sets/14/apple.json';
import { init as emojisInit } from 'emoji-mart';
import { EMOJI_STYLE } from 'shared/constants/emojisConfig';

export interface ApplicationManager {
  user: User | undefined;
  loading: boolean;
  error: boolean;
}

// Example custom emoji
// const custom = [
//   {
//     id: 'giffs',
//     name: 'giffs',
//     emojis: [
//       {
//         id: 'party_parrot',
//         name: 'Party Parrot',
//         keywords: ['dance', 'dancing'],
//         skins: [{ src: '/parrot.gif' }],
//       },
//     ],
//   },
// ];

export const useApplicationManager = (): ApplicationManager => {
  const [loading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [user, setUser] = useState<User>();

  useEffect(() => {
    init();
    emojisInit({ data, set: EMOJI_STYLE });
  }, []);

  const init = async () => {
    try {
      const user = await getFetch<User>('/api/current');
      setUser(user);
    } catch (error) {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    user,
    loading,
    error,
  };
};
