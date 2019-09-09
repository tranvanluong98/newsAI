import React, { useState, useMemo } from 'react';
import get from 'lodash/get';

import ContractCreateForm from '@/pages/Project/Contract/All/components/ContractCreateForm';
import UserEditForm from '@/pages/User/List/components/UserEditForm';
import DrawerContent from '@/components/DrawerContent';
import DrawerNav from '@/components/DrawerNav';
import ListController from '@/core/controllers/ListController';
import Resource from '@/core/Resource';
// import WeightEditForm from '@/pages/User/List/components/UserEditForm';
import WeightList from '@/pages/Project/Contract/All/components/WeightList';

const EditDrawerContent = ({ contractId, closeDrawer, version }) => (
  <DrawerContent initActiveTab="editInfo">
    <UserEditForm
      title="Cập nhật thông tin người dùng"
      name="editInfo"
      resource="users"
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
          resource="users"
          id={passVals.id}
        />
      </DrawerContent>
    );
  }
  return null;
};

export default drawerContents;
