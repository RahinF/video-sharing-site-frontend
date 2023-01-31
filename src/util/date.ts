import { differenceInDays, format, formatDistanceToNow } from 'date-fns';

const DAYS_IN_A_WEEK = 7;
export const timeAgoOrDate = (date: Date) => {
  const targetDate = new Date(date);
  const days = differenceInDays(Date.now(), targetDate);

  return days > DAYS_IN_A_WEEK
    ? format(targetDate, 'd MMM, yyyy') // displays e.g - 7 sep, 2022
    : formatDistanceToNow(targetDate, { addSuffix: true }); // displays e.g - 1 day ago
};

export const timeAgo = (date: Date) => {
  return formatDistanceToNow(new Date(date), { addSuffix: true });
};
