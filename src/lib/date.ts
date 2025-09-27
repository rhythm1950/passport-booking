import { format, formatDistanceToNow, isPast, addMinutes } from 'date-fns';

export const formatDate = (date: string | Date) => {
  return format(new Date(date), 'MMM dd, yyyy');
};

export const formatDateTime = (date: string | Date) => {
  return format(new Date(date), 'MMM dd, yyyy hh:mm a');
};

export const formatTimeAgo = (date: string | Date) => {
  return formatDistanceToNow(new Date(date), { addSuffix: true });
};

export const isExpired = (date: string | Date) => {
  return isPast(new Date(date));
};

export const addMinutesToDate = (date: string | Date, minutes: number) => {
  return addMinutes(new Date(date), minutes);
};

export const formatCountdown = (targetDate: string | Date): string => {
  const now = new Date();
  const target = new Date(targetDate);
  const diff = target.getTime() - now.getTime();

  if (diff <= 0) return '00:00';

  const minutes = Math.floor(diff / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);

  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};