import get from 'lodash/get';
import {
  CRUD_CHANGE_LIST_PARAMS,
  SET_LIST_SELECTED_IDS,
  TOGGLE_LIST_ITEM,
} from '@/core/actions/resourceActions/listActions';
import {
  CRUD_CREATE,
  CRUD_CREATE_SUCCESS,
  CRUD_DELETE,
  CRUD_DELETE_MANY,
  CRUD_GET_ALL,
  CRUD_GET_LIST,
  CRUD_GET_LIST_SUCCESS,
  CRUD_GET_MANY,
  CRUD_GET_MANY_REFERENCE,
  CRUD_GET_MANY_REFERENCE_SUCCESS,
  CRUD_GET_MANY_SUCCESS,
  CRUD_GET_MATCHING,
  CRUD_GET_ONE,
  CRUD_GET_ONE_SUCCESS,
  CRUD_UPDATE,
  CRUD_UPDATE_MANY,
  CRUD_UPDATE_SUCCESS,
} from '@/core/actions/resourceActions/dataActions';
import { OPTIMISTIC } from '@/core/actions/resourceActions/optimisticActions';
import {
  dataAndListReducer,
  registerResource,
  unregisterResource,
} from '@/core/reducers/resource';
import {
  namespace,
  REGISTER_RESOURCE,
  UNREGISTER_RESOURCE,
  RESOURCE_REFRESH_VIEW,
} from '@/core/actions/resourceActions';
import dataProvider from '@/services/dataProvider';
import getFuncNameFromAction from '@/utils/getFuncNameFromAction';
import handleFetch from '@/core/sideEffects/fetch';

const getFuncNameWithNS = getFuncNameFromAction(namespace);

const listAndDataActions = [
  OPTIMISTIC,
  SET_LIST_SELECTED_IDS,
  TOGGLE_LIST_ITEM,
  CRUD_CHANGE_LIST_PARAMS,
  CRUD_GET_ALL,
  CRUD_DELETE_MANY,
  CRUD_GET_LIST,
  CRUD_GET_MANY,
  CRUD_GET_MANY_REFERENCE,
  CRUD_GET_MATCHING,
  CRUD_GET_ONE,
  CRUD_UPDATE,
  CRUD_UPDATE_MANY,
  CRUD_CREATE_SUCCESS,
  CRUD_GET_LIST_SUCCESS,
  CRUD_GET_MANY_REFERENCE_SUCCESS,
  CRUD_GET_MANY_SUCCESS,
  CRUD_GET_ONE_SUCCESS,
  CRUD_UPDATE_SUCCESS,
];

const fetchEffectActions = [
  CRUD_CREATE,
  CRUD_DELETE,
  CRUD_GET_ALL,
  CRUD_DELETE_MANY,
  CRUD_GET_LIST,
  CRUD_GET_MANY,
  CRUD_GET_MANY_REFERENCE,
  CRUD_GET_MATCHING,
  CRUD_GET_ONE,
  CRUD_UPDATE,
  CRUD_UPDATE_MANY,
];

const umiModel = {
  namespace,
  state: {},
  reducers: {
    [getFuncNameWithNS(RESOURCE_REFRESH_VIEW)]: (state, action) => ({
      ...state,
      [action.payload]: {
        ...state[action.payload],
        viewVersion: (get(state, [action.payload, 'viewVersion']) || 0) + 1,
      },
    }),
    [getFuncNameWithNS(REGISTER_RESOURCE)]: (state, action) =>
      registerResource(state, action),
    [getFuncNameWithNS(UNREGISTER_RESOURCE)]: (state, action) =>
      unregisterResource(state, action),
    ...listAndDataActions.reduce(
      (listAndDataReducer, a) => ({
        ...listAndDataReducer,
        [getFuncNameWithNS(a)]: (state, action) =>
          dataAndListReducer(state, action),
      }),
      {},
    ),
    refreshView(state, action) {
      return {
        ...state,
        [action.meta.resource]: {
          ...state[action.meta.resource],
          viewVersion: state.viewVersion + 1,
        },
      };
    },
  },
  effects: {
    ...fetchEffectActions.reduce(
      (listAndDataEffects, a) => ({
        ...listAndDataEffects,
        *[getFuncNameWithNS(a)](action, sagaEffect) {
          yield handleFetch(dataProvider, action, sagaEffect);
        },
      }),
      {},
    ),
  },
};

export default umiModel;
