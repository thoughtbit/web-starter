class DateHelper {
  static formatDateTime(datetime, showtime) {
    const time = datetime || new Date();
    const year = time.getFullYear();
    const month = time.getMonth() + 1 < 10 ? '0' + (time.getMonth() + 1) : time.getMonth() + 1;
    const day = time.getDate() < 10 ? '0' + time.getDate() : time.getDate();
    const hh = time.getHours() < 10 ? '0' + time.getHours() : time.getHours();
    const mm = time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes();
    const hm = time.getSeconds() < 10 ? '0' + time.getSeconds() : time.getSeconds();
    return showtime ? `${year}-${month}-${day} ${hh}:${mm}:${hm}` : `${year}-${month}-${day}`;
  }

  static formatTime(datetime) {
    const time = datetime || new Date();
    const hh = time.getHours() < 10 ? '0' + time.getHours() : time.getHours();
    const mm = time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes();
    const hm = time.getSeconds() < 10 ? '0' + time.getSeconds() : time.getSeconds();
    return `${hh}:${mm}:${hm}`;
  }
}

export default DateHelper;
