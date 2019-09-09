import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import {
  registerResource,
  unregisterResource,
} from '@/core/actions/resourceActions';

const useResource = ({ resource, hasList, hasEdit, hasCreate, hasShow }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      registerResource({ resource, hasList, hasEdit, hasCreate, hasShow }),
    );

    return () => {
      console.log('unregisterResource ', resource);
      dispatch(unregisterResource(resource));
    };
  }, [dispatch, hasCreate, hasEdit, hasList, hasShow, resource]);
  const resourceState = useSelector(state => state.resources[resource]);
  return { resourceState };
};

export default useResource;
