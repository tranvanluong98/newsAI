import { useState, useCallback } from 'react';

const useDrawer = (drawerContents = () => null, isOpen) => {
  console.log('re init useDrawer');
  const [drawerState, updateDrawerState] = useState({
    isOpen: isOpen || false,
  });

  const handleCloseDrawer = useCallback(() => {
    updateDrawerState({
      ...drawerState,
      isOpen: false,
    });
  }, [drawerState]);

  const openDrawer = useCallback(
    (contentType, passVals, version) => {
      updateDrawerState({
        ...drawerState,
        isOpen: true,
        passVals,
        contentType,
        version,
      });
    },
    [drawerState],
  );

  const toggleDrawer = useCallback(() => {
    updateDrawerState({
      ...drawerState,
      isOpen: !drawerState.isOpen,
    });
  }, [drawerState]);

  return {
    version: drawerState.version,
    handleCloseDrawer,
    openDrawer,
    toggleDrawer,
    drawerContent: drawerContents(
      drawerState.contentType,
      drawerState.passVals,
    ),
    drawerState,
  };
};

export default useDrawer;
