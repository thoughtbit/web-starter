import { ref, onMounted, onUnmounted } from "vue";

/**
 *  获取本地时间
 */
export const useTime = () => {
  let timer: any; // 定时器
  const year = ref(0); // 年份
  const month = ref(0); // 月份
  const week = ref(""); // 星期几
  const day = ref(0); // 天数
  const hour = ref<number | string>(0); // 小时
  const minute = ref<number | string>(0); // 分钟
  const second = ref<number | string>(0); // 秒
  const nowTime = ref<string>(""); // 当前时间

  /*
   * 格式化日期 补零
   */
  const format = (num: number): any => {
    return num < 10 ? `0${num}` : num;
  };

  // 更新时间
  const updateTime = () => {
    const date = new Date();
    year.value = date.getFullYear();
    month.value = date.getMonth() + 1;
    week.value = "日一二三四五六".charAt(date.getDay());
    day.value = date.getDate();
    hour.value = format(date.getHours());
    minute.value = format(date.getMinutes());
    second.value = format(date.getSeconds());
  };

  updateTime();

  onMounted(() => {
    clearInterval(timer);
    timer = setInterval(() => updateTime(), 1000);
  });

  onUnmounted(() => {
    clearInterval(timer);
  });

  return { year, month, day, hour, minute, second, week, nowTime };
};
