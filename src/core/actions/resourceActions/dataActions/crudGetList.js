import { GET_LIST } from '@/core/dataFetchActions';
import { namespace } from '@/core/actions/resourceActions';

export const CRUD_GET_LIST = `${namespace}/crudGetList`;

export const CRUD_GET_LIST_LOADING = `${namespace}/crudGetListLoading`;

export const CRUD_GET_LIST_FAILURE = `${namespace}/crudGetListFailure`;

export const CRUD_GET_LIST_SUCCESS = `${namespace}/crudGetListSuccess`;

export const crudGetList = (resource, pagination, sort, filter) => ({
  type: CRUD_GET_LIST,
  payload: { pagination, sort, filter },
  meta: {
    resource,
    fetch: GET_LIST,
    onFailure: {
      notification: {
        body: 'ra.notification.http_error',
        level: 'warning',
      },
    },
  },
});
