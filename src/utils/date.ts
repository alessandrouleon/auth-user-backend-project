import { formatToTimeZone } from 'date-fns-timezone';

export const newDate = (): Date => {

    const currentDate = new Date();
    const targetTimeZone = 'America/Manaus';
    const formattedDate = formatToTimeZone(currentDate, 'YYYY-MM-DD HH:mm:ss', { timeZone: targetTimeZone });
    const dateParts = formattedDate.split(/[- :]/);
    return new Date(Date.UTC(dateParts[0], dateParts[1] - 1, dateParts[2], dateParts[3], dateParts[4], dateParts[5]));
};

