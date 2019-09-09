import { useCallback, useState, useEffect } from 'react';

import dataProvider from '@/services/dataProvider';
import devLog from '@/utils/devLog';

const useDataProvider = ({
  type,
  resource,
  init,
  params,
  header,
  onSuccess,
}) => {
  const [loading, updateLoading] = useState(false);
  const [response, updateResponse] = useState(null);
  const [complete, updateComplete] = useState(false);
  const [error, updateError] = useState(null);
  const apiCall = useCallback(
    async newParams => {
      updateLoading(true);
      updateError(null);
      try {
        const res = await dataProvider(
          type,
          resource,
          { ...params, ...newParams },
          header,
        );
        updateResponse(res.data);
        updateLoading(false);
        updateComplete(true);
        if (typeof onSuccess === 'function') {
          onSuccess(res);
        }
        return res;
      } catch (err) {
        console.log('apiCall error ', err);
        updateError(err);
        updateLoading(false);
        devLog(() =>
          console.error(
            `error occurred in useDataProvider with type ${type} and resource ${resource} and params ${JSON.stringify(
              params,
            )}: `,
            error,
          ),
        );
        throw err;
      }
    },
    [error, header, onSuccess, params, resource, type],
  );
  useEffect(
    () => {
      if (init) {
        apiCall();
      }
    },
    [] // eslint-disable-line
  );
  const retry = useCallback(() => {
    apiCall();
  }, [apiCall]);

  return { apiCall, loading, response, error, retry, complete };
};

export default useDataProvider;
