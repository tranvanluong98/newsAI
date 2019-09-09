import { GET_ONE } from '@/core/dataFetchActions';
import { namespace } from '@/core/actions/resourceActions';

export const CRUD_GET_ONE = `${namespace}/crudGetOne`;

export const CRUD_GET_ONE_LOADING = `${namespace}/crudGetOneLoading`;

export const CRUD_GET_ONE_FAILURE = `${namespace}/crudGetOneFailure`;

export const CRUD_GET_ONE_SUCCESS = `${namespace}/crudGetOneSuccess`;

export const crudGetOne = (resource, id, basePath, refresh = true) => ({
  type: CRUD_GET_ONE,
  payload: { id },
  meta: {
    resource,
    fetch: GET_ONE,
    basePath,
    onFailure: {
      notification: {
        body: 'ra.notification.item_doesnt_exist',
        level: 'warning',
      },
      redirectTo: 'list',
    },
  },
});
