import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { crudDelete } from '@/core/actions/resourceActions/dataActions';

const useDeleteController = ({ resource, record, basePath, redirect }) => {
  const dispatch = useDispatch();

  const deleteRecord = useCallback(() => {
    dispatch(crudDelete(resource, record.id, record, basePath, redirect));
  }, [basePath, dispatch, record, redirect, resource]);

  return { deleteRecord };
};

export default useDeleteController;
