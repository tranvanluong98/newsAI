import { DELETE } from '@/core/dataFetchActions';
import { namespace } from '@/core/actions/resourceActions';

export const CRUD_DELETE = `${namespace}/crudDelete`;

export const CRUD_DELETE_LOADING = `${namespace}/crudDeleteLoading`;

export const CRUD_DELETE_FAILURE = `${namespace}/crudDeleteFailure`;

export const CRUD_DELETE_SUCCESS = `${namespace}/crudDeleteSuccess`;

export const crudDelete = (
  resource,
  id,
  previousData,
  basePath,
  redirectTo = 'list',
  refresh = true,
) => ({
  type: CRUD_DELETE,
  payload: { id, previousData },
  meta: {
    resource,
    fetch: DELETE,
    onSuccess: {
      notification: {
        body: 'ra.notification.deleted',
        level: 'info',
        messageArgs: {
          smart_count: 1,
        },
      },
      refresh,
      redirectTo,
      basePath,
    },
    onFailure: {
      notification: {
        body: 'ra.notification.http_error',
        level: 'warning',
      },
    },
  },
});
