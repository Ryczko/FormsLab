import { formatDistance } from 'date-fns';
import { Timestamp } from 'firebase/firestore';

const formatFirebaseDateWithHours = (date: Timestamp | undefined) => {
  return (
    date?.toDate().toLocaleString(undefined, {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }) ?? ''
  );
};

const formatFirebaseDateWithoutHours = (date: Timestamp | undefined) => {
  return (
    date?.toDate().toLocaleString(undefined, {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    }) ?? ''
  );
};

const formatDateDistance = (date: Timestamp | undefined) => {
  const dateObject = date?.toDate();

  if (!dateObject) return '';

  const distance = formatDistance(dateObject, new Date(), {
    addSuffix: true,
    includeSeconds: true,
  });

  const formattedDistance = distance.replace(/^less than /, '');
  return formattedDistance;
};

export {
  formatFirebaseDateWithHours,
  formatFirebaseDateWithoutHours,
  formatDateDistance,
};
