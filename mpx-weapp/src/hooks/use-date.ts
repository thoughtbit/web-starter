import { ref, onMounted, onUnmounted } from '@mpxjs/core';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export default function useDate(d: dayjs.ConfigType = Date.now(), timeout: number) {
  const date = ref(dayjs(d));

  if (timeout) {
    let timerId: any;

    onMounted(() => {
      timerId = setInterval(() => {
        date.value = dayjs(Date.now());
      }, timeout ?? 0);
    });

    onUnmounted(() => {
      clearInterval(timerId);
    });
  }

  return date;
}
