import { GET_MANY } from '@/core/dataFetchActions';
import { namespace } from '@/core/actions/resourceActions';

export const CRUD_GET_MANY = `${namespace}/crudGetMany`;

export const CRUD_GET_MANY_LOADING = `${namespace}/crudGetManyLoading`;

export const CRUD_GET_MANY_FAILURE = `${namespace}/crudGetManyFailure`;

export const CRUD_GET_MANY_SUCCESS = `${namespace}/crudGetManySuccess`;

export const crudGetMany = (resource, ids) => ({
  type: CRUD_GET_MANY,
  payload: { ids },
  meta: {
    resource,
    fetch: GET_MANY,
    onFailure: {
      notification: {
        body: 'ra.notification.http_error',
        level: 'warning',
      },
    },
  },
});
