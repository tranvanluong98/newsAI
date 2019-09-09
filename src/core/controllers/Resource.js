import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';

import {
  registerResource,
  unregisterResource,
} from '@/core/actions/resourceActions';

const Resource = ({
  resource,
  hasList,
  hasEdit,
  hasCreate,
  hasShow,
  children,
}) => {
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
  return React.cloneElement(children, { resourceState });
};

export default Resource;
