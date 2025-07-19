import { DRAFT_SURVEY_SESSION_STORAGE } from 'shared/constants/app';

export const getRedirectRoute = () => {
  if (typeof window === 'undefined') return '/';

  const draftSurvey = sessionStorage.getItem(DRAFT_SURVEY_SESSION_STORAGE);
  if (draftSurvey) {
    return '/survey/create';
  }

  return '/';
};
