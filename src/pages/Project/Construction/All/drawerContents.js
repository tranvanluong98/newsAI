import React from 'react';

import ConstructionForm from './components/ConstructionForm';
import DrawerContent from '@/components/DrawerContent';
import EditConstructionForm from './components/EditConstructionForm';

const drawerContents = (contentType, passVals) => {
  if (contentType === 'edit') {
    return (
      <DrawerContent>
        <EditConstructionForm id={passVals.id} />
      </DrawerContent>
    );
  }
  if (contentType === 'create') {
    return (
      <DrawerContent>
        <ConstructionForm
          key="editInfo"
          title="Hạng mục"
          name="editInfo"
          resource="construction"
          id={passVals.id}
        />
      </DrawerContent>
    );
  }
  return null;
};

export default drawerContents;
