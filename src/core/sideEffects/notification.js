/**
 * Notification Side Effects
 */
import { showNotification } from '@/core/actions/notificationActions';

function* handleNotification(
  { error, meta: { notification, optimistic } },
  { put },
) {
  const { body, level, messageArgs = {} } = notification;
  if (error) {
    return yield put(
      showNotification(
        typeof error === 'string' ? error : error.message || body,
        level || 'warning',
        {
          messageArgs,
          undoable: false,
        },
      ),
    );
  }
  return yield put(
    showNotification(body, level || 'info', {
      messageArgs,
      undoable: optimistic,
    }),
  );
}

export default handleNotification;
