// 手机号
export const phoneRule = (value: string) => {
  const reg = /^1((3[\d])|(4[5,6,7,9])|(5[0-3,5-9])|(6[5-7])|(7[0-8])|(8[\d])|(9[1,8,9]))\d{8}$/;
  return reg.test(value);
};

// 电话和手机号
export const mobileFullRule = (value: string) => {
  const reg =
    /^((\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)$/;
  return reg.test(value);
};

// 身份证校验
export const idCardRule = (value: string) => {
  const reg =
    /^\d{6}((((((19|20)\d{2})(0[13-9]|1[012])(0[1-9]|[12]\d|30))|(((19|20)\d{2})(0[13578]|1[02])31)|((19|20)\d{2})02(0[1-9]|1\d|2[0-8])|((((19|20)([13579][26]|[2468][048]|0[48]))|(2000))0229))\d{3})|((((\d{2})(0[13-9]|1[012])(0[1-9]|[12]\d|30))|((\d{2})(0[13578]|1[02])31)|((\d{2})02(0[1-9]|1\d|2[0-8]))|(([13579][26]|[2468][048]|0[048])0229))\d{2}))(\d|X|x)$/;
  return reg.test(value);
};

// 护照（包含香港、澳门）
export const passportRule = (value: string) => {
  const reg = /(^[EeKkGgDdSsPpHh]\d{8}$)|(^(([Ee][a-fA-F])|([DdSsPp][Ee])|([Kk][Jj])|([Mm][Aa])|(1[45]))\d{7}$)/;
  return reg.test(value);
};

// 香港身份证
export const idCardHongKongRule = (value: string) => {
  const reg = /^[a-zA-Z]\d{6}\([\dA]\)$/;
  return reg.test(value);
};

// 澳门身份证
export const idCardMacaoRule = (value: string) => {
  const reg = /^[1|5|7]\d{6}\(\d\)$/;
  return reg.test(value);
};

// 台湾身份证
export const idCardTaiwanRule = (value: string) => {
  const reg = /^[a-zA-Z][0-9]{9}$/;
  return reg.test(value);
};

// 军官证
export const officerCardRule = (value: string) => {
  const reg = /^[\u4E00-\u9FA5](字第)([0-9a-zA-Z]{4,8})(号?)$/;
  return reg.test(value);
};

// 护照
export const passPortCardRule = (value: string) => {
  const reg = /^([a-zA-z]|[0-9]){5,17}$/;
  return reg.test(value);
};

// 台湾居民来往大陆通行证
export const twCardRule = (value: string) => {
  const reg = /^\d{8}|^[a-zA-Z0-9]{10}|^\d{18}$/;
  return reg.test(value);
};

export const lwCardRule = (value: string) => {
  const reg = /^[A-Z]{3}\d{6}(?:0[1-9]|1[021])(?:0[1-9]|[21]\d|3[10])\d{2}$/;
  return reg.test(value);
};

// 密码强度校验，最少6位
export const passwordRule = (value: string) => {
  const reg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[~@#$%\*-\+=:,\\?\[\]\{}]).{6,20}$/;
  return reg.test(value);
};
