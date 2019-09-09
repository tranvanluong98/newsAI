import {
  COMPLETE,
  UNDO,
  startOptimisticMode,
  stopOptimisticMode,
} from '@/core/actions/undoActions';
import { OPTIMISTIC } from '@/core/actions/resourceActions/optimisticActions';
import { refreshView } from '@/core/actions/uiActions';
import { showNotification } from '@/core/actions/notificationActions';

export function* handleUndoRace(undoableAction, { put, race, take }) {
  const {
    payload: { action },
  } = undoableAction;
  const { onSuccess, onFailure, ...metaWithoutSideEffects } = action.meta;
  yield put(startOptimisticMode());
  // dispatch action in optimistic mode (no fetch), with success side effects
  yield put({
    ...action,
    type: OPTIMISTIC,
    meta: {
      ...metaWithoutSideEffects,
      ...onSuccess,
      optimistic: true,
    },
  });
  // wait for undo or delay
  const { complete } = yield race({
    undo: take(UNDO),
    complete: take(COMPLETE),
  });
  yield put(stopOptimisticMode());
  if (complete) {
    // if not cancelled, redispatch the action, this time immediate, and without success side effect
    yield put({
      ...action,
      meta: {
        ...metaWithoutSideEffects,
        onSuccess: { refresh: true },
        onFailure: { ...onFailure, refresh: true },
      },
    });
  } else {
    yield put(showNotification('ra.notification.canceled'));
    yield put(refreshView());
  }
}
