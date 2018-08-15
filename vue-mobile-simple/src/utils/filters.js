/* eslint-disable */
function pluralize(time, label) {
  if (time === 1) {
    return time + label;
  }
  return `${time + label}s`;
}

export function timeAgo(time) {
  const between = (Date.now() / 1000) - Number(time);
  if (between < 3600) {
    return pluralize(~~(between / 60), ' minute');
  } else if (between < 86400) {
    return pluralize(~~(between / 3600), ' hour');
  } else {
    return pluralize(~~(between / 86400), ' day');
  }
}

export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null;
  }

  if ((`${time}`).length === 10) {
    time = +time * 1000;
  }

  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}';
  let date;
  if (typeof time === 'object') {
    date = time;
  } else {
    date = new Date(parseInt(time));
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay(),
  };
  const timeStr = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key];
    if (key === 'a') return ['Year', 'Month', 'Day', 'Hours', 'Minute', 'Seconds', 'Milliseconds'][value - 1];
    if (result.length > 0 && value < 10) {
      value = `0${value}`;
    }
    return value || 0;
  });
  return timeStr;
}

export function formatTime(time, option) {
  time = +time * 1000;
  const d = new Date(time);
  const now = Date.now();

  const diff = (now - d) / 1000;

  if (diff < 30) {
    return 'Just';
  } else if (diff < 3600) { // less 1 hour
    return `${Math.ceil(diff / 60)}minutes ago`;
  } else if (diff < 3600 * 24) {
    return `${Math.ceil(diff / 3600)}An hour ago`;
  } else if (diff < 3600 * 24 * 2) {
    return '1 day ago';
  }
  if (option) {
    return parseTime(time, option);
  } else {
    return `${d.getMonth() + 1}Month${d.getDate()}Day${d.getHours()}Time${d.getMinutes()}Minute`;
  }
}

export function html2Text(val) {
  const div = document.createElement('div');
  div.innerHTML = val;
  return div.textContent || div.innerText;
}

export function date(value) {
  return new Date(value).toLocaleString();
}

export function lowerCase(str) {
  return str.toLowerCase();
}

export function lowerThenCapitalize(str) {
  let lowercase = str.toLowerCase();
  return lowercase.charAt(0).toUpperCase() + lowercase.slice(1);
}
