const namespace = 'notification';

export const SHOW_NOTIFICATION = `${namespace}/show`;
export const HIDE_NOTIFICATION = `${namespace}/hide`;
export const UNDO_NOTIFICATION = `${namespace}/undo`;
export const NOTIFICATION_EFFECT_HANDLE = `${namespace}/effectHandle`;

export const showNotification = (
  // A translatable label or text to display on notification
  message,
  // The type of the notification
  type = 'info',
  // Specify additional parameters of notification
  notificationOptions,
) => ({
  type: SHOW_NOTIFICATION,
  payload: {
    ...notificationOptions,
    type,
    message,
  },
});

export const hideNotification = () => ({
  type: HIDE_NOTIFICATION,
});
