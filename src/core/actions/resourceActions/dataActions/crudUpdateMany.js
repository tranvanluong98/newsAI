import { UPDATE_MANY } from '@/core/dataFetchActions';
import { namespace } from '@/core/actions/resourceActions';

export const CRUD_UPDATE_MANY = `${namespace}/crudUpdateMany`;

export const CRUD_UPDATE_MANY_LOADING = `${namespace}/crudUpdateManyLoading`;

export const CRUD_UPDATE_MANY_FAILURE = `${namespace}/crudUpdateManyFailure`;

export const CRUD_UPDATE_MANY_SUCCESS = `${namespace}/crudUpdateManySuccess`;

export const crudUpdateMany = (
  resource,
  ids,
  data,
  basePath,
  refresh = true,
) => ({
  type: CRUD_UPDATE_MANY,
  payload: { ids, data },
  meta: {
    resource,
    fetch: UPDATE_MANY,
    onSuccess: {
      notification: {
        body: 'ra.notification.updated',
        level: 'info',
        messageArgs: {
          smart_count: ids.length,
        },
      },
      basePath,
      refresh,
      unselectAll: true,
    },
    onFailure: {
      notification: {
        body: 'ra.notification.http_error',
        level: 'warning',
      },
    },
  },
});
