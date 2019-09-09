export const namespace = 'auth';

export const USER_LOGIN = `${namespace}/USER_LOGIN`;
export const USER_LOGIN_LOADING = `${namespace}/USER_LOGIN_LOADING`;
export const USER_LOGIN_FAILURE = `${namespace}/USER_LOGIN_FAILURE`;
export const USER_LOGIN_SUCCESS = `${namespace}/USER_LOGIN_SUCCESS`;

export const userLogin = (payload, pathName) => ({
  type: USER_LOGIN,
  payload,
  meta: { auth: true, pathName },
});

export const USER_CHECK = `${namespace}/USER_CHECK`;
export const USER_CHECK_SUCCESS = `${namespace}/USER_CHECK_SUCCESS`;

export const userCheck = (payload, pathName, routeParams) => ({
  type: USER_CHECK,
  payload: {
    ...payload,
    routeParams,
  },
  meta: { auth: true, pathName },
});

export const USER_LOGOUT = `${namespace}/USER_LOGOUT`;

export const userLogout = redirectTo => ({
  type: USER_LOGOUT,
  payload: { redirectTo },
  meta: { auth: true },
});
