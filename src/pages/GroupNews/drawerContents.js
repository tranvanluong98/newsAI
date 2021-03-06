import React, { useState, useMemo } from 'react';
import get from 'lodash/get';

import ContractCreateForm from '@/pages/Project/Contract/All/components/ContractCreateForm';
import ContractEditForm from '@/pages/Project/Contract/All/components/ContractEditForm';
import DrawerContent from '@/components/DrawerContent';
import DrawerNav from '@/components/DrawerNav';
import ListController from '@/core/controllers/ListController';
import Resource from '@/core/Resource';
import WeightEditForm from '@/pages/Project/Contract/All/components/WeightEditForm';
import WeightList from '@/pages/Project/Contract/All/components/WeightList';

const EditDrawerContent = ({ contractId, closeDrawer, version }) => (
  <DrawerContent initActiveTab="editInfo">
    <ContractEditForm
      title="Hợp đồng"
      name="editInfo"
      resource="posts"
      id={contractId}
    />
  </DrawerContent>
);
const drawerContents = (contentType, passVals) => {
  if (contentType === 'edit') {
    return <EditDrawerContent contractId={passVals.id} />;
  }
  if (contentType === 'create') {
    return (
      <DrawerContent>
        <ContractCreateForm
          title="Hợp đồng"
          name="createInfo"
          resource="posts"
          id={passVals.id}
        />
      </DrawerContent>
    );
  }
  return null;
};

export default drawerContents;
