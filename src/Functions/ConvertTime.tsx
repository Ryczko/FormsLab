import { Timestamp } from 'firebase/firestore';


const formatFirebaseDateWithHours = (date: Timestamp) => {
  return date.toDate().toLocaleString('pl-PL', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

const formatFirebaseDateWithoutHours = (date: Timestamp) => {
  return date.toDate().toLocaleString('pl-PL', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  });
};

export {formatFirebaseDateWithHours, formatFirebaseDateWithoutHours};