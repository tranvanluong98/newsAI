import { CRUD_GET_LIST_SUCCESS } from '@/core/actions/resourceActions/dataActions';

const loadedOnceReducer = (previousState = false, { type }) => {
  // early return
  if (previousState === true) {
    return previousState;
  }
  if (type === CRUD_GET_LIST_SUCCESS) {
    return true;
  }
  return previousState;
};

export default loadedOnceReducer;
