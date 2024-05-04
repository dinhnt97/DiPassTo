import dayjs from 'dayjs';

export function formatDate(time: any) {
  return dayjs(time).format('DD/MM/YYYY');
}

export function formatDateTime(time: any) {
  return dayjs(time).format('HH:mm DD/MM/YYYY');
}

export function addDay(currentDate: Date | string, numberDay: number) {
  return new Date(new Date(currentDate).getTime() + numberDay * 86400 * 1000);
}

export function subDay(currentDate: Date | string, numberDay: number) {
  return new Date(new Date(currentDate).getTime() - numberDay * 86400 * 1000);
}
