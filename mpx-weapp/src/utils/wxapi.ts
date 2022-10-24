import mpx from '@mpxjs/core';
import { withPromisify } from './with-promisify';

/**
 * 微信用户登录,获取code
 */
export function wxLogin(options = {}) {
  return withPromisify(mpx.login, options);
}

/**
 * 获取微信匿名用户信息
 * 注意:须在登录之后调用.
 */
export function wxGetUserInfo(
  options = { desc: '获取您的匿名基本信息' }
): Promise<WechatMiniprogram.GetUserInfoSuccessCallbackResult> {
  return withPromisify(mpx.getUserInfo, options);
}

/**
 * 获取微信用户信息
 * 注意:须在登录之后调用, 不会有授权提示.
 */
export function wxGetUserProfile(
  options = { desc: '获取您的基本信息' }
): Promise<WechatMiniprogram.GetUserProfileSuccessCallbackResult> {
  return withPromisify(mpx.getUserProfile, options);
}

/**
 *
 * 获取用户的当前设置
 */
export function wxGetSetting(options = {}): Promise<WechatMiniprogram.GetSettingSuccessCallbackResult> {
  return withPromisify(mpx.getSetting, options);
}

/**
 * 获取系统信息
 */
export function wxGetSystemInfo(options = {}) {
  return withPromisify(mpx.getSystemInfo, options);
}

/**
 * 获取系统剪贴板的内容
 */
export function wxGetClipboardData(options = {}) {
  return withPromisify(mpx.getClipboardData, options);
}

/**
 * 获取当前的地理位置、速度
 */
export function wxGetLocation(options = {}) {
  return withPromisify(mpx.getLocation, options);
}

/**
 * 文件上传
 */
export function wxUploadFile(options = {}) {
  return withPromisify(mpx.uploadFile, options);
}

export enum ScopeEnums {
  userInfo = 'scope.userInfo', // 是否授权用户信息，对应接口 mpx.getUserInfo
  location = 'scope.userLocation', // 是否授权地理位置，对应接口 mpx.getLocation, mpx.chooseLocation
  address = 'scope.address', // 是否授权通讯地址，对应接口 mpx.chooseAddress
  invoiceTitle = 'scope.invoiceTitle', // 是否授权发票抬头，对应接口 mpx.chooseInvoiceTitle
  invoice = 'scope.invoice', // 是否授权获取发票，对应接口 mpx.chooseInvoice
  werun = 'scope.werun', // 是否授权微信运动步数，对应接口 mpx.getWeRunData
  record = 'scope.record', // 是否授权录音功能，对应接口 mpx.startRecord
  writePhotosAlbum = 'scope.writePhotosAlbum', // 是否授权保存到相册 mpx.saveImageToPhotosAlbum, mpx.saveVideoToPhotosAlbum
  camera = 'scope.camera', // 是否授权摄像头，对应[camera]((camera)) 组件
  phoneContact = 'scope.addPhoneContact', // mpx.addPhoneContact 添加到联系人
  phoneCalendar = 'scope.addPhoneCalendar', // mpx.addPhoneRepeatCalendar, mpx.addPhoneCalendar 添加到日历
}

// 判断是否授权了用户信息
export async function isAuthorizationUserInfo() {
  const hasAuthorize = await checkAuthorize(ScopeEnums.userInfo);
  if (!hasAuthorize) {
    throw new Error('no authorize');
  }
  const userInfo = await wxGetUserProfile();
  return userInfo;
}

// 获取授权后匿名用户信息
export async function getUserInfo() {
  await authorize(ScopeEnums.userInfo);
  const userInfo = await wxGetUserInfo();
  return userInfo;
}

// 获取授权后用户信息
export async function getUserProfile() {
  await authorize(ScopeEnums.userInfo);
  const userInfo = await wxGetUserProfile();
  return userInfo;
}

// 获取授权后地理位置
export async function getLocation() {
  await authorize(ScopeEnums.location);
  const location = await wxGetLocation({ type: 'gcj02' });
  return location;
}

// 判断是否授权了某个权限
export async function checkAuthorize(scope: string) {
  const result = await wxGetSetting();
  const setting: any = result.authSetting;
  return !!setting[scope];
}

// 申请某一个权限
export async function authorize(scope: string) {
  const hasAuthorize = await checkAuthorize(scope);
  if (!hasAuthorize) {
    await mpx.authorize({ scope });
  }
}

// 路由跳转
export function navigate(url: string, type = 'navigateTo') {
  if (!type) {
    type = 'navigateTo';
  }
  switch (type) {
    case 'navigateTo':
      mpx.navigateTo({
        url,
        fail: () => {
          mpx.switchTab({ url });
        },
      });
      break;
    case 'redirectTo':
      mpx.redirectTo({ url });
      break;
    case 'switchTab':
      mpx.switchTab({ url });
      break;
    case 'reLaunch':
      mpx.reLaunch({ url });
      break;
  }
}

// 返回
export function back(delta: number) {
  if (!delta) {
    delta = 1;
  }
  mpx.navigateBack({ delta });
}
