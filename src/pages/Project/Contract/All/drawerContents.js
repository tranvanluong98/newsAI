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

const EditDrawerContent = ({ contractId, closeDrawer, version }) => {
  const WeightContext = useMemo(() => React.createContext(), []);
  const [weightId, updateWeightId] = useState(null);
  return (
    <DrawerNav
      passProps={{ editWeight: { id: weightId, closeDrawer } }}
      version={version}
    >
      <DrawerContent navKey="editTab" initActiveTab="editInfo">
        <ContractEditForm
          title="Hợp đồng"
          name="editInfo"
          resource="contract"
          id={contractId}
        />
        <WeightList
          name="weightList"
          title="Khối lượng"
          contractId={contractId}
          onRowClick={record => updateWeightId(record.id)}
        />
      </DrawerContent>
      <DrawerContent navKey="editWeight">
        <Resource
          resource="weight"
          hasCreate
          name="editWeight"
          hasBack
          title="Cập nhật khối lượng"
        >
          <ListController Context={WeightContext} resource="weight">
            <WeightEditForm
              name="weightEditForm"
              resource="weight"
              id={weightId}
            />
          </ListController>
        </Resource>
      </DrawerContent>
    </DrawerNav>
  );
};
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
          resource="contract"
          id={passVals.id}
        />
      </DrawerContent>
    );
  }
  return null;
};

export default drawerContents;
