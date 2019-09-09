import {
  AUTH_LOGIN,
  AUTH_LOGOUT,
  AUTH_CHECK,
  AUTH_ERROR,
  AUTH_CHANGE_PASS,
  AUTH_GET_PERMISSIONS,
  AUTH_FORGOT_PASSWORD,
} from '@/core/authFetchActions';
import { apiParamsKey } from '@/config';
import { authApiMeta } from '@/services/authProvider/config';
import { authCall as call } from '@/utils/call';

const { basicLogin, forgotPass, updatePass } = authApiMeta;

export default async (type, params, header) => {
  if (type === AUTH_LOGIN) {
    try {
      const data = await call(
        basicLogin.method,
        basicLogin.url,
        { ...params },
        header,
      );
      localStorage.setItem('accessToken', data[apiParamsKey.accessToken]);
      localStorage.setItem('refreshToken', data[apiParamsKey.refreshToken]);
      return 'OK';
    } catch (err) {
      throw err;
    }
    // accept all username/password combinations
  }
  if (type === AUTH_FORGOT_PASSWORD) {
    const { email } = params;
    // console.log(`login ${phone} ${password}`);
    try {
      const ret = await call(
        forgotPass.method,
        forgotPass.url,
        { email },
        header,
      );
      // console.log('forgotpassword ', ret);

      return ret;
    } catch (err) {
      throw err;
    }
  }
  if (type === AUTH_CHANGE_PASS) {
    try {
      const ret = await call(
        updatePass.method,
        updatePass.url,
        {
          [apiParamsKey.oldPassword]: params[apiParamsKey.oldPassword],
          [apiParamsKey.newPassword]: params[apiParamsKey.newPassword],
        },
        header,
      );
      return ret;
    } catch (err) {
      throw err;
    }
  }
  if (type === AUTH_LOGOUT) {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    return Promise.resolve();
  }
  if (type === AUTH_ERROR) {
    if ((params.response && params.response.status) === 401) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      return Promise.reject();
    }
    return Promise.resolve();
  }
  if (type === AUTH_CHECK) {
    return localStorage.getItem('accessToken')
      ? Promise.resolve(localStorage.getItem('accessToken'))
      : Promise.reject(new Error('accessToken outdated'));
  }

  if (type === AUTH_GET_PERMISSIONS) {
    return localStorage.getItem('role')
      ? Promise.resolve(localStorage.getItem('role'))
      : Promise.reject(new Error('user has no permission'));
  }

  return Promise.reject(new Error('unknow type of authProvider'));
  // accept all username/password combinations
};
