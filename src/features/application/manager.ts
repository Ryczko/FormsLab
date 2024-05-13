import { useState, useEffect } from 'react';
import { getFetch } from '../../../lib/axiosConfig';
import { User } from '@prisma/client';

import data from '@emoji-mart/data/sets/14/apple.json';
import { init as emojisInit } from 'emoji-mart';
import { EMOJI_STYLE, customEmojisData } from 'shared/constants/emojisConfig';
import { Page } from 'features/application/types/Page';

export const useApplicationManager = () => {
  const [loading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [user, setUser] = useState<User>();
  const [isBrowser, setIsBrowser] = useState(false);
  const [activePage, setActivePage] = useState<Page>();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsBrowser(true);
    }

    init();
  }, []);

  const init = async () => {
    try {
      await emojisInit({ data, custom: customEmojisData, set: EMOJI_STYLE });
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
    isBrowser,
    activePage,
    setActivePage,
  };
};

export type ApplicationManager = ReturnType<typeof useApplicationManager>;
