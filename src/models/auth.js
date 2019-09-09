import { FETCH_ERROR } from '@/core/actions/fetchActions';
import {
  USER_CHECK,
  USER_LOGIN,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  namespace,
} from '@/core/actions/authActions';
import {
  fetchErrorEffect,
  userCheckEffect,
  userLoginEffect,
} from '@/core/sideEffects/auth';
import authProvider from '@/services/authProvider';
import authReducer from '@/core/reducers/auth';
import getFuncNameFromAction from '@/utils/getFuncNameFromAction';

const getFuncNameWithNS = getFuncNameFromAction(namespace);

export default {
  namespace,
  state: { isLoggedIn: false },
  reducers: {
    [getFuncNameWithNS(USER_LOGIN_SUCCESS)]: (state, action) =>
      authReducer(state, action),
    [getFuncNameWithNS(USER_LOGOUT)]: (state, action) =>
      authReducer(state, action),
  },
  effects: {
    *[getFuncNameWithNS(USER_LOGOUT)](action, sagaEffect) {
      yield userLoginEffect(action, sagaEffect, authProvider);
    },
    *[getFuncNameWithNS(USER_CHECK)](action, sagaEffect) {
      yield userCheckEffect(action, sagaEffect, authProvider);
    },
    *[getFuncNameWithNS(FETCH_ERROR)](action, sagaEffect) {
      yield fetchErrorEffect(action, sagaEffect, authProvider);
    },
    *[getFuncNameWithNS(USER_LOGIN)](action, sagaEffect) {
      yield userLoginEffect(action, sagaEffect, authProvider);
    },
  },
};
