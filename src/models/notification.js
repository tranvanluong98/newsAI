import { NOTIFICATION_EFFECT_HANDLE } from '@/core/actions/notificationActions';
import getFuncNameFromAction from '@/utils/getFuncNameFromAction';
import handleNotification from '@/core/sideEffects/notification';

const namespace = 'notification';

export const SHOW_NOTIFICATION = `${namespace}/show`;
export const HIDE_NOTIFICATION = `${namespace}/hide`;
export const UNDO_NOTIFICATION = `${namespace}/undo`;

const getFuncNameWithNS = getFuncNameFromAction(namespace);

export default {
  namespace,
  state: [],
  reducers: {
    [getFuncNameWithNS(SHOW_NOTIFICATION)](state, action) {
      return [...state, action.payload];
    },
    [getFuncNameWithNS(HIDE_NOTIFICATION)](state) {
      return state.slice(1);
    },
    [getFuncNameWithNS(UNDO_NOTIFICATION)](state) {
      return state.slice(1);
    },
  },
  effects: {
    *[getFuncNameWithNS(NOTIFICATION_EFFECT_HANDLE)](action, sagaEffect) {
      yield handleNotification(action, sagaEffect);
    },
  },
};
