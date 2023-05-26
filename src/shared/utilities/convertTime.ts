import { formatDistance } from 'date-fns';

const formatDateDistance = (date: string | Date) => {
  const dateObject = new Date(date);

  if (!dateObject) return '';

  const distance = formatDistance(dateObject, new Date(), {
    addSuffix: true,
    includeSeconds: true,
  });

  const formattedDistance = distance.replace(/^less than /, '');
  return formattedDistance;
};

const formatDate = (date: string | Date) => {
  const dateObject = new Date(date);

  if (!dateObject) return '';

  const formattedDate = dateObject.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return formattedDate;
};

export { formatDateDistance, formatDate };
