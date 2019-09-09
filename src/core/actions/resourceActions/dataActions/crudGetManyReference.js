import { GET_MANY_REFERENCE } from '@/core/dataFetchActions';

import { namespace } from '@/core/actions/resourceActions';

export const CRUD_GET_MANY_REFERENCE = `${namespace}/crudGetManyReference`;

export const CRUD_GET_MANY_REFERENCE_LOADING = `${namespace}/crudGetManyReferenceLoading`;

export const CRUD_GET_MANY_REFERENCE_FAILURE = `${namespace}/crudGetManyReferenceFailure`;

export const CRUD_GET_MANY_REFERENCE_SUCCESS = `${namespace}/crudGetManyReferenceSuccess`;

export const crudGetManyReference = (
  reference,
  target,
  id,
  relatedTo,
  pagination,
  sort,
  filter,
  source,
) => ({
  type: CRUD_GET_MANY_REFERENCE,
  payload: { target, id, pagination, sort, filter, source },
  meta: {
    resource: reference,
    relatedTo,
    fetch: GET_MANY_REFERENCE,
    onFailure: {
      notification: {
        body: 'ra.notification.http_error',
        level: 'warning',
      },
    },
  },
});
