import Cookies from 'js-cookie';

// key
const REQUEST_HEADERS = 'REQUEST_HEADERS';

// 请求headers
const headers = {
  'Content-Type': 'application/json;charset=UTF-8',
  loginStatus: 0,
};

/**
 * 设置header
 * @param headers
 */
export function setHeaders(data) {
  for (let item in data) {
    headers[item] = data[item]
  }
  Cookies.set(REQUEST_HEADERS, headers, {
    expires: new Date(new Date().getTime() + 86400000),   // 过期时间24小时
  });
}


/**
 * 获取header
 */
export function getHeaders() {
  if (Cookies.get(REQUEST_HEADERS) == undefined) {
    return null;
  }
  return JSON.parse(Cookies.get(REQUEST_HEADERS));
}


/**
 * 清除headers
 */
export function clearHeaders() {
  for (let item in headers) {
    if (item == 'Content-Type') {
      continue;
    }
    headers[item] = '';
  }
  Cookies.set(REQUEST_HEADERS, headers);
}


/**
 * request
 * @param url
 * @param body
 */
export function request(url, body) {

}
