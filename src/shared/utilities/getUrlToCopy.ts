export const getUrlToCopy = (surveyId: string) => {
  return `${window.location.protocol}//${window.location.host}/survey/${surveyId}`;
};
