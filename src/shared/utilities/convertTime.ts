import { formatDistance } from 'date-fns';

const formatDateDistance = (date: string) => {
  const dateObject = new Date(date);

  if (!dateObject) return '';

  const distance = formatDistance(dateObject, new Date(), {
    addSuffix: true,
    includeSeconds: true,
  });

  const formattedDistance = distance.replace(/^less than /, '');
  return formattedDistance;
};

export { formatDateDistance };
