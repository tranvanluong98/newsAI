import { routerRedux } from 'dva/router';

import {
  AUTH_CHECK,
  AUTH_ERROR,
  AUTH_LOGIN,
  AUTH_LOGOUT,
} from '@/core/authFetchActions';
import {
  USER_LOGIN_FAILURE,
  USER_LOGIN_LOADING,
  USER_LOGIN_SUCCESS,
} from '@/core/actions/authActions';
import {
  hideNotification,
  showNotification,
} from '@/core/actions/notificationActions';

const nextPathnameSelector = state => {
  const locationState = state.router.location.state;
  return locationState && locationState.nextPathname;
};

const currentPathnameSelector = state => state.router.location;

export const userLoginEffect = function* userLoginEffect(
  action,
  { put, call, select },
  authProvider,
) {
  const { payload, meta } = action;
  try {
    yield put({ type: USER_LOGIN_LOADING });
    const authPayload = yield call(authProvider, AUTH_LOGIN, payload);
    yield put({
      type: USER_LOGIN_SUCCESS,
      payload: authPayload,
    });
    const redirectTo = yield meta.pathName || select(nextPathnameSelector);
    yield put(routerRedux.push(redirectTo || '/'));
  } catch (e) {
    yield put({
      type: USER_LOGIN_FAILURE,
      error: e,
      meta: { auth: true },
    });
    let errorMessage = '';
    if (e === 'string') {
      errorMessage = e;
    } else {
      errorMessage =
        typeof e === 'undefined' || !e.message
          ? 'ra.auth.sign_in_error'
          : e.message;
    }
    yield put(showNotification(errorMessage, 'warning'));
  }
};

export const userCheckEffect = function* userCheckEffect(
  action,
  { put, call },
  authProvider,
) {
  const { payload, meta } = action;
  try {
    yield call(authProvider, AUTH_CHECK, payload);
  } catch (error) {
    yield call(authProvider, AUTH_LOGOUT);
    yield put(
      routerRedux.replace({
        pathname: (error && error.redirectTo) || '/login',
        state: { nextPathname: meta.pathName },
      }),
    );
  }
};

export const userLogoutEffect = function* userLogoutEffect(
  action,
  { put, call },
  authProvider,
) {
  yield put(
    routerRedux.push((action.payload && action.payload.redirectTo) || '/login'),
  );
  yield call(authProvider, AUTH_LOGOUT);
};

export const fetchErrorEffect = function* fetchErrorEffect(
  action,
  { put, call, select },
  authProvider,
) {
  const { error } = action;
  try {
    yield call(authProvider, AUTH_ERROR, error);
  } catch (e) {
    const nextPathname = yield select(currentPathnameSelector);
    yield call(authProvider, AUTH_LOGOUT);
    yield put(
      routerRedux.push({
        pathname: '/login',
        state: { nextPathname },
      }),
    );
    yield put(hideNotification());
    yield put(showNotification('ra.notification.logged_out', 'warning'));
  }
};
