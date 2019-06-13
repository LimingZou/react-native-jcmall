import { env } from "..";

const ROOT_URL = `${env.apiHost}`;
export const UserApi = {
  login: {
    url: `${ROOT_URL}`,
    service:"User_login",
    method: 'POST',
    showLoading: true,
    needLogin: false
  },
  loginBySms: {
    url: `${ROOT_URL}`,
    service:"User_loginBySms",
    method: 'POST',
    showLoading: true,
    needLogin: false
  },
  register: {
    url: `${ROOT_URL}`,
    service:"User_register",
    method: 'POST',
    showLoading: true,
    needLogin: false
  },
  resetPassword: {
    url: `${ROOT_URL}`,
    service:"User_resetPwdBySms",
    method: 'POST',
    showLoading: true,
    needLogin: true
  },
  logout: {
    url: `${ROOT_URL}`,
    service:"User_logout",
    method: 'POST',
    showLoading: true,
    needLogin: false
  },
  token: {
    url: `${ROOT_URL}server/user/token`,
    method: "POST"
  },
  self: {
    url: `${ROOT_URL}`,
    service:"User_queryMyInfo",
    method: 'POST',
    showLoading: true,
    needLogin: true
  },
  nationalCodeList: {
    url: `${ROOT_URL}`,
    service:"GlobalCode_queryGlobalCodeListPage",
    method: 'POST',
    showLoading: false,
    needLogin: false,
  },
  // 获取验证码相关
  registerVerifyCode: {
    url: `${ROOT_URL}`,
    service:"User_sendRegisterSms",
    method: 'POST',
    showLoading: true,
    needLogin: false,
  },
  loginVerifyCode: {
    url: `${ROOT_URL}`,
    service:"User_sendLoginSms",
    method: 'POST',
    showLoading: true,
    needLogin: false,
  },
  resetPasswordVerifyCode: {
    url: `${ROOT_URL}`,
    service:"User_sendResetPwdSms",
    method: 'POST',
    showLoading: true,
    needLogin: false,
  },
  editPasswordVerifyCode: {
    url: `${ROOT_URL}`,
    service:"User_sendUpdatePwdSms",
    method: 'POST',
    showLoading: true,
    needLogin: true,
  },
  changeUserPwdBySms: {
    url: `${ROOT_URL}`,
    service:"User_updateUserPwdBySms",
    method: 'POST',
    showLoading: true,
    needLogin: true
  },
  setPayPassword: {
    url: `${ROOT_URL}`,
    service:"User_setPayPassword",
    method: 'POST',
    showLoading: true,
    needLogin: true,
  },
  updatePayPasswordBySms: {
    url: `${ROOT_URL}`,
    service:"User_updatePayPasswordBySms",
    method: 'POST',
    showLoading: true,
    needLogin: true,
  },
  editPayPasswordVerifyCode: {
    url: `${ROOT_URL}`,
    service:"User_sendPayPwdSms",
    method: 'POST',
    showLoading: true,
    needLogin: true
  },
  uploadFile: {
    url: `${ROOT_URL}`,
    service: "MidFile/uploadFile",
    method: "POST",
    showLoading: false,
    needLogin: false
  },
  queryMyInfo: {
    url: `${ROOT_URL}`,
    service: "User_queryMyInfo",
    method: "POST",
    showLoading: false,
    needLogin: false
  },
  updateMyInfo: {
    url: `${ROOT_URL}`,
    service: "User_updateMyInfo",
    method: "POST",
    showLoading: false,
    needLogin: true
  },
  isHasUserPayPassword:{
    url: `${ROOT_URL}`,
    service: "User_isHasUserPayPassword",
    method: "POST",
    showLoading: false,
    needLogin: true
  }
};
