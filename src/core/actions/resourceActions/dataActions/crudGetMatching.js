import { GET_LIST } from '@/core/dataFetchActions';
import { namespace } from '@/core/actions/resourceActions';

export const CRUD_GET_MATCHING = `${namespace}/crudGetMatching`;

export const CRUD_GET_MATCHING_LOADING = `${namespace}/crudGetMatchingLoading`;

export const CRUD_GET_MATCHING_FAILURE = `${namespace}/crudGetMatchingFailure`;

export const CRUD_GET_MATCHING_SUCCESS = `${namespace}/crudGetMatchingSuccess`;

export const crudGetMatching = (
  reference,
  relatedTo,
  pagination,
  sort,
  filter,
) => ({
  type: CRUD_GET_MATCHING,
  payload: { pagination, sort, filter },
  meta: {
    resource: reference,
    relatedTo,
    fetch: GET_LIST,
    onFailure: {
      notification: {
        body: 'ra.notification.http_error',
        level: 'warning',
      },
    },
  },
});
