import Cookies from 'js-cookie';


/**
 * 设置cookie
 * @param key
 * @param value
 */
export function setStorage(key, value) {
  Cookies.set(key, value);
}


/**
 * 获取cookie
 * @param key
 */
export function getStorage(key) {
  return Cookies.get(key);
}


/**
 * 转换日期格式
 * @param date
 */
export function parseDate(date) {
  if (date == undefined || date == null) {
    return;
  }
  return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
}
