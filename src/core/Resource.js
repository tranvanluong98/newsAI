import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';

import {
  registerResource,
  unregisterResource,
} from '@/core/actions/resourceActions';

const Resource = ({
  resource,
  children,
  hasList,
  hasEdit,
  hasCreate,
  hasShow,
  persistent,
  passProps,
}) => {
  const dispatch = useDispatch();

  const resourceReady = useSelector(state => state.resources[resource]);
  useEffect(() => {
    dispatch(
      registerResource({ resource, hasList, hasEdit, hasCreate, hasShow }),
    );
    console.log('register ', resource);
    return () => {
      console.log('component will unmount');
      if (!persistent) {
        dispatch(unregisterResource(resource));
      }
    };
  }, [dispatch, hasCreate, hasEdit, hasList, hasShow, persistent, resource]);

  if (!resourceReady) {
    return null;
  }
  return <>{children}</>;
};

export default Resource;
