import { USER_LOGIN_SUCCESS, USER_LOGOUT } from '@/core/actions/authActions';

const initialState = { isLoggedIn: false };

const authReducer = (previousState = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN_SUCCESS:
      return { ...previousState, isLoggedIn: true };
    case USER_LOGOUT:
      return { ...previousState, isLoggedIn: false };
    default:
      return previousState;
  }
};

export const isLoggedIn = state => state.isLoggedIn;

export default authReducer;
