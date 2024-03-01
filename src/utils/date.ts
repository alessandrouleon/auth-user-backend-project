import { format } from 'date-fns-tz';

export const getUtcDate = (): Date => {
  return new Date(
    format(new Date(), 'yyyy-MM-dd HH:mm:ssXXX', { timeZone: 'UTC' }),
  );
};
