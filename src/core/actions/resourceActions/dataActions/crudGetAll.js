import { GET_LIST } from '@/core/dataFetchActions';

import { namespace } from '@/core/actions/resourceActions';

export const CRUD_GET_ALL = `${namespace}/crudGetAll`;

export const CRUD_GET_ALL_LOADING = `${namespace}/crudGetAllLoading`;

export const CRUD_GET_ALL_FAILURE = `${namespace}/crudGetAllFailure`;

export const CRUD_GET_ALL_SUCCESS = `${namespace}/crudGetAllSuccess`;

export const crudGetAll = (resource, sort, filter, maxResults, callback) => ({
  type: CRUD_GET_ALL,
  payload: { sort, filter, pagination: { page: 1, perPage: maxResults } },
  meta: {
    resource,
    fetch: GET_LIST,
    onSuccess: {
      callback,
    },
    onFailure: {
      notification: {
        body: 'ra.notification.http_error',
        level: 'warning',
      },
    },
  },
});
