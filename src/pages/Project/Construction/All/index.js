import { Button, Icon } from 'antd';
import React, { useState } from 'react';

import Datagrid from '@/containers/List/components/Datagrid';
import EditDrawer from '@/components/EditDrawer';
import Filters from '@/pages/Project/Contract/All/components/Filters';
import ListController from '@/core/controllers/ListController';
import ListView from '@/containers/List';
import Resource from '@/core/Resource';
import SearchInput from '@/components/Input/SearchInput';
import commonStyles from '@/common.less';
import createNewFilterForm from '@/core/ui/list/FilterForm';
import drawerContents from '@/pages/Project/Construction/All/drawerContents';
import useDrawer from '@/hooks/useDrawer';

const AllFilterForm = createNewFilterForm({
  name: 'allConstructionFilterForm',
});

export const ConstructionLCContext = React.createContext();

const Construction = () => {
  const [activeTabKey, updateActiveTabKey] = useState('construction');

  const {
    handleCloseDrawer,
    openDrawer,
    toggleDrawer,
    drawerContent,
    drawerState,
    updatePassVals,
  } = useDrawer(drawerContents, false);

  return (
    <Resource resource="construction" hasList hasEdit hasCreate hasShow>
      <ListController
        resource="construction"
        passProps={{ activeTabKey }}
        Context={ConstructionLCContext}
      >
        <ListView
          toggleDrawer={toggleDrawer}
          handleChangeTabs={activeKey => {
            console.log('activeKey ', activeKey);
            updateActiveTabKey(activeKey);
          }}
          title="hợp đồng"
          tabs={[
            {
              name: 'Tất cả',
              key: 'all',
            },
            {
              name: 'Quan tâm',
              key: 'interested',
            },
            {
              name: 'Qúa hạn',
              key: 'expired',
            },
            {
              name: 'Nóng',
              key: 'hot',
            },
            {
              name: 'Hoạt động',
              key: 'activity',
            },
          ]}
          actions={
            <div className={commonStyles.flex}>
              <AllFilterForm
                Context={ConstructionLCContext}
                filters={[
                  {
                    alwaysOn: true,
                    source: 'q',
                  },
                ]}
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
              Context={ConstructionLCContext}
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
            Context={ConstructionLCContext}
            tabKey="construction"
            columns={[
              {
                title: 'Hạng mục công việc',
                key: 'catalogJob',
                dataIndex: 'catalogJob',
              },
              {
                title: 'Nhóm',
                key: 'group',
                dataIndex: 'group',
                render: text => <span>{text && text.name}</span>,
              },
              {
                title: 'Gói thầu',
                key: 'package',
                dataIndex: 'package',
                render: text => <span>{text && text.name}</span>,
              },
              {
                title: 'Nhà thầu',
                key: 'contractor',
                dataIndex: 'contractor',
                render: text => <span>{text && text.name}</span>,
              },
              {
                title: 'Ngày khởi công',
                key: 'realStartDate',
                dataIndex: 'realStartDate',
              },
              {
                title: 'Dự kiến hoàn thành',
                key: 'expectFinishDate',
                dataIndex: 'expectFinishDate',
              },
              {
                title: 'Trạng thái',
                key: 'constructionState',
                dataIndex: 'constructionState',
                render: text => <span>{`${text && text.name}`}</span>,
              },
              {
                title: 'Tương tác',
                key: 'interactive',
                dataIndex: 'interactive',
                render: record => (
                  <span>
                    <Icon type="message" /> {record.cmtNum}{' '}
                    <Icon type="paper-clip" /> {record.attachNum}
                  </span>
                ),
              },
              {
                title: 'Quan tâm',
                key: 'isInterested',
                dataIndex: 'isInterested',
                render: () => (
                  <span>
                    <Icon type="star" />
                  </span>
                ),
              },
            ]}
            tableOptions={{
              onRow: record => ({
                onClick: () =>
                  openDrawer('edit', {
                    id: record.id,
                  }),
              }),
            }}
          />
        </ListView>
      </ListController>
      <EditDrawer visible={drawerState.isOpen} onClose={handleCloseDrawer}>
        {drawerContent}
      </EditDrawer>
    </Resource>
  );
};

export default Construction;
