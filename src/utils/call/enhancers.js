import jwtDecode from 'jwt-decode';

import { apiParamsKey } from '@/config';
import RequestError from '@/utils/call/error';

export const addRequestAccessToken = (
  requestHandler,
  getRefreshToken,
  requestAccessToken,
  forceLogout = () => null,
) => async (type, resource, params, header, accessToken, ...rest) => {
  let refreshToken = getRefreshToken;
  if (typeof getRefreshToken === 'function') {
    refreshToken = getRefreshToken();
  }
  let refreshAccessToken = accessToken;
  // logArgs({
  // prefix: 'addRequestAccessToken',
  // args: { type, resource, params, header, accessToken },
  // });
  if (
    typeof accessToken === 'string' &&
    accessToken.match(/[A-Za-z0-9\-\._~\+\/]+=*/) // eslint-disable-line
  ) {
    let needRefresh = false;

    try {
      const jwt = jwtDecode(accessToken);
      if (Date.now() / 1000 > jwt.exp - 20) {
        needRefresh = true;
      }
    } catch (e) {
      needRefresh = true;
    }
    if (needRefresh) {
      try {
        const ret = await requestAccessToken({
          [apiParamsKey.refreshToken]: refreshToken,
        });

        refreshAccessToken = ret[apiParamsKey.accessToken];
        localStorage.setItem('accessToken', refreshAccessToken);
        localStorage.setItem('refreshToken', ret[apiParamsKey.refreshToken]);
      } catch (e) {
        forceLogout();
        throw new RequestError({
          status: 401,
          message: 'cannot refresh accesstToken',
          // originError: e ==> beget circle reference
        });
      }
    }
  }
  try {
    const data = await requestHandler(
      type,
      resource,
      params,
      header,
      refreshAccessToken,
      ...rest,
    );
    return data;
  } catch (e) {
    throw e;
  }
};

// Decorator for saga api request

export const addLanguageToHeader = (requestHandler, getLangCode) => (
  type,
  resource,
  params,
  header,
  accessToken,
) => {
  let langCode = getLangCode;
  if (typeof getLangCode === 'function') {
    langCode = getLangCode();
  }

  const localizedHeader = {
    ...header,
    'x-language': langCode,
  };

  return requestHandler(type, resource, params, localizedHeader, accessToken);
};

export const addAccessToken = (requestHandler, getAccessToken) => (
  type,
  resource,
  params,
  header,
  ...rest
) => {
  const accessToken =
    typeof getAccessToken === 'function'
      ? getAccessToken()
      : localStorage.getItem('accessToken');
  return requestHandler(type, resource, params, header, accessToken, ...rest);
};
