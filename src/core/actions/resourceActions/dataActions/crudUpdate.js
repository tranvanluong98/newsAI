import { UPDATE } from '@/core/dataFetchActions';
import { namespace } from '@/core/actions/resourceActions';

export const CRUD_UPDATE = `${namespace}/crudUpdate`;

export const CRUD_UPDATE_LOADING = `${namespace}/crudUpdateLoading`;

export const CRUD_UPDATE_FAILURE = `${namespace}/crudUpdateFailure`;

export const CRUD_UPDATE_SUCCESS = `${namespace}/crudUpdateSuccess`;

export const crudUpdate = (
  resource,
  id,
  data,
  previousData,
  basePath,
  redirectTo = 'show',
  callback = {},
  notification = {},
) => {
  console.log('crudUpdate callback ', callback);
  const safeCallback = callback || {};
  return {
    type: CRUD_UPDATE,
    payload: { id, data, previousData },
    meta: {
      resource,
      fetch: UPDATE,
      onSuccess: {
        notification: notification.onSuccess || {
          message: 'ra.notification.updated',
        },
        callback: safeCallback.onSuccess,
        redirectTo,
        basePath,
      },
      onFailure: {
        notification: notification.onFailure || {
          message: 'ra.notification.http_error',
        },
        callback: safeCallback.onFailure,
      },
    },
  };
};
