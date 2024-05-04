import dayjs from 'dayjs';

export function formatDate(time: any) {
  return dayjs(time).format('DD/MM/YYYY');
}

export function formatDateTime(time: any) {
  return dayjs(time).format('HH:mm DD/MM/YYYY');
}
