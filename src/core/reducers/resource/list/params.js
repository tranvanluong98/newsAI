import get from 'lodash/get';
import { CRUD_CHANGE_LIST_PARAMS } from '@/core/actions/resourceActions/listActions';

const defaultState = {
  sort: null,
  order: null,
  page: 1,
  perPage: null,
  filter: {},
};

const paramsReducer = (previousState = defaultState, action) => {
  switch (action.type) {
    case CRUD_CHANGE_LIST_PARAMS:
      return {
        ...action.payload,
        filter: {
          ...get(previousState, 'filter'),
          ...get(action.payload, 'filter'),
        },
      };
    default:
      return previousState;
  }
};

export default paramsReducer;
