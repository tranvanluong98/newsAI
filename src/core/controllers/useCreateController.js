import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';

import { crudCreate as crudCreateAction } from '@/core/actions/resourceActions/dataActions';

const useCreateController = ({ basePath, resource, redirect }) => {
  const dispatch = useDispatch();

  const { isLoading } = useSelector(state => ({
    isLoading: state.loading.global,
  }));

  const save = useCallback(
    (data, callback) => {
      dispatch(crudCreateAction(resource, data, basePath, redirect, callback));
      console.log('data post ', data);
    },
    [basePath, dispatch, redirect, resource],
  );

  return {
    save,
    resource,
    isLoading,
    redirect,
  };
};

export default useCreateController;
