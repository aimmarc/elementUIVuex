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


/**
 * 读取图片文件
 * @param file
 */
export function fileReader(file) {
  return new Promise((resolve, reject) => {
    const isJPG = file.type.split('/')[0] === 'image';
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isJPG) {
      reject('所选文件必须是图片格式!');
    }
    if (!isLt2M) {
      reject('上传图片大小不能超过 2MB!');
    }
    const reader = new FileReader();
    reader.addEventListener("load", function () {
      resolve(reader.result);
    }, false);
    reader.readAsDataURL(file);
  })
}
