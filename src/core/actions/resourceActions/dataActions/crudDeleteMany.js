import { DELETE_MANY } from '@/core/dataFetchActions';

import { namespace } from '@/core/actions/resourceActions';

export const CRUD_DELETE_MANY = `${namespace}/crudDeleteMany`;

export const CRUD_DELETE_MANY_LOADING = `${namespace}/crudDeleteManyLoading`;

export const CRUD_DELETE_MANY_FAILURE = `${namespace}/crudDeleteManyFailure`;

export const CRUD_DELETE_MANY_SUCCESS = `${namespace}/crudDeleteManySuccess`;

export const crudDeleteMany = (resource, ids, basePath, refresh = true) => ({
  type: CRUD_DELETE_MANY,
  payload: { ids },
  meta: {
    resource,
    fetch: DELETE_MANY,
    onSuccess: {
      notification: {
        body: 'ra.notification.deleted',
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
