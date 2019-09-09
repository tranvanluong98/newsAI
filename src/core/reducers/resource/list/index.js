import get from 'lodash/get';
import idsReducer from './ids';
import loadedOnceReducer from './loadedOnce';
import paramsReducer from './params';
import selectedIdsReducer from './selectedIds';
import totalReducer from './total';

const listReducer = (state, action) => ({
  ids: idsReducer(get(state, 'ids'), action),
  loadedOnce: loadedOnceReducer(get(state, 'loadedOnce'), action),
  params: paramsReducer(get(state, 'params'), action),
  selectedIds: selectedIdsReducer(get(state, 'selectedIds'), action),
  total: totalReducer(get(state, 'total'), action),
});

export default listReducer;
