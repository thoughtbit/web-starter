import dayjs from "dayjs";

const dateFormat = (dataStr: any, pattern: string = "YYYY-MM-DD HH:mm:ss") => {
  return dayjs(dataStr).format(pattern);
};

const date = (value : string) => {
  return new Date(value).toLocaleString();
}

export {
  date,
  dateFormat
}
