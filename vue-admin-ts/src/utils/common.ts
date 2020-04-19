import dayjs from "dayjs";
import CryptoJS from "crypto-js";
import { ENCRYPT_KEY, ENCRYPT_IV } from "@/constants";

export const isServer: boolean = typeof window === "undefined";

/**
 * @returns {string}
 */
export function guid() {
  const s4 = () =>
    Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  return s4() + s4() + "-" + s4() + "-" + s4() + "-" + s4() + "-" + s4() + s4() + s4();
}

/**
 * Return unique entity.id
 * @param {Object} entity
 */
export function uniqueEntityId() {
  return new Date().getTime() + "-" + guid();
}

export function dateFormat(dataStr: any, pattern = "YYYY-MM-DD HH:mm:ss") {
  return dayjs(dataStr).format(pattern);
}

// 对象深拷贝
export function deepClone(obj: any) {
  let result = Array.isArray(obj) ? [] : {};
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (typeof obj[key] === "object") {
        // @ts-ignore
        result[key] = deepClone(obj[key]);
      } else {
        // @ts-ignore
        result[key] = obj[key];
      }
    }
  }
  return result;
}

// base64ToFile
export function base64ToFile(base64Data: any, tempfilename: string, contentType: string) {
  let _contentType = contentType || "";
  let sliceSize = 1024;
  let byteCharacters = atob(base64Data);
  let bytesLength = byteCharacters.length;
  let slicesCount = Math.ceil(bytesLength / sliceSize);
  let byteArrays = new Array(slicesCount);

  for (let sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
    let begin = sliceIndex * sliceSize;
    let end = Math.min(begin + sliceSize, bytesLength);

    let bytes = new Array(end - begin);
    for (let offset = begin, i = 0; offset < end; ++i, ++offset) {
      bytes[i] = byteCharacters[offset].charCodeAt(0);
    }
    byteArrays[sliceIndex] = new Uint8Array(bytes);
  }
  const file = new File(byteArrays, tempfilename, { type: _contentType });
  return file;
}

// 将base64转换为文件
export function dataURLtoFile(dataurl: string, filename: string) {
  let arr = dataurl.split(",");
  // @ts-ignore
  let mime = arr[0].match(/:(.*?);/)[1];
  let bstr = atob(arr[1]);
  let n = bstr.length;
  let u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
}

// 将图片转换为Base64
export function getImgToBase64(url: string, callback: any, outputFormat: any) {
  let canvas = document.createElement("canvas");
  let ctx = canvas.getContext("2d");
  let img = new Image();
  img.crossOrigin = "Anonymous";
  img.onload = function() {
    canvas.height = img.height;
    canvas.width = img.width;
    // @ts-ignore
    ctx.drawImage(img, 0, 0);
    let dataURL = canvas.toDataURL(outputFormat || "image/png");
    callback(dataURL);
    // @ts-ignore
    canvas = null;
  };
  img.src = url;
}

// AES加密
export function aesEncrypted(str: string, key = ENCRYPT_KEY, iv = ENCRYPT_IV) {
  let cryptoKey = CryptoJS.enc.Utf8.parse(key);
  let cryptoIv = CryptoJS.enc.Utf8.parse(iv.substr(0, 8));
  let encodeStr = CryptoJS.AES.encrypt(str, cryptoKey, {
    iv: cryptoIv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  return encodeStr.toString();
}

// AES解密
export function aesDecrypted(str: string, key = ENCRYPT_KEY, iv = ENCRYPT_IV) {
  let cryptoKey = CryptoJS.enc.Utf8.parse(key);
  let cryptoIv = CryptoJS.enc.Utf8.parse(iv.substr(0, 8));
  let decryptStr = CryptoJS.AES.decrypt(str, cryptoKey, {
    iv: cryptoIv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  return decryptStr.toString(CryptoJS.enc.Utf8);
}

// 3DES加密
export function desEncrypted(str: string, key = ENCRYPT_KEY, iv = ENCRYPT_IV) {
  let cryptoKey = CryptoJS.enc.Utf8.parse(key);
  let cryptoIv = CryptoJS.enc.Utf8.parse(iv.substr(0, 8));
  let encodeStr = CryptoJS.TripleDES.encrypt(str, cryptoKey, {
    iv: cryptoIv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  return encodeStr.toString();
}

// 3DES解密
export function desDecrypted(str: string, key = ENCRYPT_KEY, iv = ENCRYPT_IV) {
  let cryptoKey = CryptoJS.enc.Utf8.parse(key);
  let cryptoIv = CryptoJS.enc.Utf8.parse(iv.substr(0, 8));
  let decryptStr = CryptoJS.TripleDES.decrypt(str, cryptoKey, {
    iv: cryptoIv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  return decryptStr.toString(CryptoJS.enc.Utf8);
}
