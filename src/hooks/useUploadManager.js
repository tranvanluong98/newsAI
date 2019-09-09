import { useCallback, useState, useEffect } from 'react';

const useUploadManager = ({ uploadList, upload, removeTimeout }) => {
  const [uploadState, updateUpdateState] = useState(
    uploadList.map((item, idx) => ({
      content: item,
      pending: false,
      error: null,
      index: idx,
      remove: false,
    })),
  );

  const updateItemWithKey = useCallback(
    (key, value, index) => {
      if (!['pending', 'error', 'remove'].includes(key)) {
        return;
      }
      const newState = [...uploadState];
      newState[index] = {
        ...newState[index],
        [key]: value,
      };
    },
    [uploadState],
  );

  const retry = useCallback(
    async idx => {
      if (
        !uploadState[idx] ||
        uploadState[idx].pending ||
        !uploadState[idx].error
      ) {
        return;
      }
      updateItemWithKey('pending', true, idx);
      updateItemWithKey('error', null, idx);
      try {
        await upload(uploadState[idx].content);
        updateItemWithKey('pending', false, idx);
        setTimeout(() => updateItemWithKey('remove', true, idx), removeTimeout);
      } catch (err) {
        console.log('error on retry ', err);
        updateItemWithKey('error', err, idx);
      }
    },
    [removeTimeout, updateItemWithKey, upload, uploadState],
  );

  const startUpload = useCallback(
    async idx => {
      if (!uploadState[idx]) {
        return;
      }
      updateItemWithKey('pending', true, idx);
      try {
        await upload(uploadState[idx].content);
        updateItemWithKey('pending', false, idx);
        setTimeout(() => updateItemWithKey('remove', true, idx), removeTimeout);
      } catch (err) {
        updateItemWithKey('error', err, idx);
      }
    },
    [removeTimeout, updateItemWithKey, upload, uploadState],
  );

  const addUploadItems = useCallback(
    uItems => {
      const maxIdx = uploadState.length - 1;
      const newUploadItems = uItems.map((item, idx) => ({
        ...item,
        pending: false,
        error: null,
        index: idx + 1 + maxIdx,
      }));
      updateUpdateState([...uploadState, ...newUploadItems]);
    },
    [uploadState],
  );

  useEffect(() => {
    uploadState.forEach((item, idx) => {
      console.log('check have uploaded yet');
      if (!item.pending && !item.error) {
        startUpload(idx);
      }
    });
  }, [startUpload, uploadState]);

  return { addUploadItems, uploadState, retry };
};

export default useUploadManager;
