import { CREATE } from '@/core/dataFetchActions';
import { namespace } from '@/core/actions/resourceActions';

export const CRUD_CREATE = `${namespace}/crudCreate`;

export const CRUD_CREATE_LOADING = `${namespace}/crudCreateLoading`;

export const CRUD_CREATE_FAILURE = `${namespace}/crudCreateFailure`;

export const CRUD_CREATE_SUCCESS = `${namespace}/crudCreateSuccess`;

export const crudCreate = (resource, data, basePath, redirectTo) => ({
  type: CRUD_CREATE,
  payload: { data },
  meta: {
    resource,
    fetch: CREATE,
    onSuccess: {
      notification: {
        body: 'ra.notification.created',
        level: 'info',
        messageArgs: {
          smart_count: 1,
        },
      },
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
