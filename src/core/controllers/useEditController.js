import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useEffect } from 'react';
import get from 'lodash/get';

import {
  crudGetOne as crudGetOneAction,
  crudUpdate as crudUpdateAction,
} from '@/core/actions/resourceActions/dataActions';

const useEditController = ({ basePath, resource, id, redirect }) => {
  const dispatch = useDispatch();
  const { record, isLoading, version } = useSelector(state => ({
    record: get(state, ['resources', resource, 'data', id], null),
    isLoading: state.loading.global,
    version: get(state, ['resources', resource, 'viewVersion']),
  }));

  const updateData = useCallback(
    (r, i) => dispatch(crudGetOneAction(r, i, basePath)),
    [basePath, dispatch],
  );

  useEffect(() => {
    if (id !== null && id !== undefined) {
      console.log('update data of edit controller');
      updateData(resource, id);
    }
  }, [resource, id, updateData, version]);

  const save = useCallback(
    (data, callback = {}, notification = {}, additionalId) => {
      dispatch(
        crudUpdateAction(
          resource,
          id || additionalId,
          data,
          record,
          basePath,
          redirect,
          callback,
          notification,
        ),
      );
    },
    [basePath, dispatch, id, record, redirect, resource],
  );

  return {
    isLoading,
    save,
    resource,
    basePath,
    record,
    redirect,
    version,
  };
};

export default useEditController;
