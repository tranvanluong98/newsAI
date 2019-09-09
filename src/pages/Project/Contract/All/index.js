import 'react-id-swiper/lib/styles/css/swiper.css';

import { Button, Drawer } from 'antd';
import React, { useState } from 'react';

import Datagrid from '@/containers/List/components/Datagrid';
import Filters from '@/pages/Project/Contract/All/components/Filters';
import ListController from '@/core/controllers/ListController';
import ListView from '@/containers/List';
import Resource from '@/core/Resource';
import SearchInput from '@/components/Input/SearchInput';
import commonStyles from '@/common.less';
import createNewFilterForm from '@/core/ui/list/FilterForm';
import drawerContents from '@/pages/Project/Contract/All/drawerContents';
import useDrawer from '@/hooks/useDrawer';

const AllFilterForm = createNewFilterForm({ name: 'allContractFilterForm' });

export const ContractLCContext = React.createContext();

const AllProject = () => {
  const [activeTabKey, updateActiveTabKey] = useState('contract');

  const {
    handleCloseDrawer,
    openDrawer,
    toggleDrawer,
    drawerContent,
    drawerState,
    version,
    updatePassVals,
  } = useDrawer(drawerContents, false);

  return (
    <Resource resource="contract" hasList hasEdit hasCreate hasShow>
      <ListController
        resource="contract"
        passProps={{ activeTabKey }}
        perPage={10}
        Context={ContractLCContext}
      >
        <ListView
          handleChangeTabs={activeKey => {
            console.log('activeKey ', activeKey);
            updateActiveTabKey(activeKey);
          }}
          title="hợp đồng"
          tabs={[
            {
              name: 'Hợp đồng',
              key: 'contract',
            },
            {
              name: 'Phụ lục',
              key: 'appendix',
            },
            {
              name: 'Hoạt động',
              key: 'activity',
            },
          ]}
          actions={
            <div className={commonStyles.flex}>
              <AllFilterForm
                filters={[
                  {
                    alwaysOn: true,
                    source: 'q',
                  },
                ]}
                Context={ContractLCContext}
              >
                <SearchInput placeholder="Tìm kiếm hợp đồng" />
              </AllFilterForm>
              <Button
                type="primary"
                style={{ marginLeft: 9 }}
                onClick={() => openDrawer('create', {})}
              >
                Thêm mới
              </Button>
            </div>
          }
          filters={
            <AllFilterForm
              Context={ContractLCContext}
              filters={[
                {
                  alwaysOn: true,
                  source: 'projectId',
                },
                {
                  alwaysOn: true,
                  source: 'categoryId',
                },
                {
                  alwaysOn: true,
                  source: 'costCategoryId',
                },
              ]}
            >
              <Filters />
            </AllFilterForm>
          }
        >
          <Datagrid
            Context={ContractLCContext}
            tabKey="contract"
            columns={[
              {
                title: 'Số hợp đồng',
                key: 'contractNum',
                dataIndex: 'contractNum',
              },
              {
                title: 'Tên hợp đồng',
                key: 'contractName',
                dataIndex: 'contractName',
              },
              {
                title: 'Gói thầu',
                key: 'package',
                dataIndex: 'package',
                render: text => <span>{text && text.name}</span>,
              },
              {
                title: 'Hạng mục',
                key: 'category',
                dataIndex: 'category',
                render: text => <span>{text && text.name}</span>,
              },
              {
                title: 'Đối tác',
                key: 'partner',
                dataIndex: 'partner',
                render: text => <span>{text && text.name}</span>,
              },
              {
                title: 'Ngày ký',
                key: 'signingDate',
                dataIndex: 'signingDate',
              },
              {
                title: 'Giá trị hợp đồng',
                key: 'contractValue',
                dataIndex: 'contractValue',
              },
              {
                title: 'Phụ lục',
                key: 'addendum',
                dataIndex: 'addendum',
                render: text => <span>{`(${text && text.num})`}</span>,
              },
            ]}
            tableOptions={{
              onRow: record => ({
                onClick: () =>
                  openDrawer(
                    'edit',
                    {
                      id: record.id,
                    },
                    record.id,
                  ),
              }),
            }}
          />
        </ListView>
      </ListController>
      <Drawer
        visible={drawerState.isOpen}
        width={520}
        style={{ padding: 0 }}
        className={commonStyles.noPaddingDrawer}
        onClose={handleCloseDrawer}
      >
        {drawerContent &&
          React.cloneElement(drawerContent, {
            closeDrawer: handleCloseDrawer,
            version,
          })}
      </Drawer>
    </Resource>
  );
};

AllProject.defaultProps = {
  layoutSettings: { lontrau: true },
};

export default AllProject;
