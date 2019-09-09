import { useDispatch, useSelector } from 'react-redux';
import React, { useCallback, useEffect } from 'react';
import get from 'lodash/get';

import { crudGetOne as crudGetOneAction } from '@/core/actions/resourceActions/dataActions';

const ShowController = ({ id, resource, basePath, children }) => {
  const dispatch = useDispatch();
  const updateData = useCallback((r, i) => dispatch(crudGetOneAction(r, i)), [
    dispatch,
  ]);
  const { record, isLoading, version } = useSelector(state => ({
    record: get(state, ['resources', resource, 'data', id], null),
    isLoading: state.loading.global,
    version: state.setting.viewVersion,
  }));
  useEffect(() => {
    updateData(resource, id);
  }, [resource, id, updateData]);
  if (!children) {
    return null;
  }
  return React.cloneElement(
    children,
    isLoading,
    resource,
    basePath,
    record,
    version,
  );
};

export default ShowController;
