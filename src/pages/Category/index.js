import 'react-id-swiper/lib/styles/css/swiper.css';
import moment from 'moment';
import { Button, Drawer, Avatar } from 'antd';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import get from 'lodash/get';
import Datagrid from '@/containers/List/components/Datagrid';
import Filters from '@/pages/Category/components/Filter';
import ListController from '@/core/controllers/ListController';
import ListView from '@/containers/List';
import Resource from '@/core/Resource';
import SearchInput from '@/components/Input/SearchInput';
import commonStyles from '@/common.less';
import FilterForm from '@/core/ui/list/FilterForm';
import drawerContents from '@/pages/Project/Contract/All/drawerContents';
import useDrawer from '@/hooks/useDrawer';

export const ContractLCContext = React.createContext();

const CategoryList = ({ ...props }) => {
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
    <Resource resource="categories" hasList hasEdit hasCreate hasShow>
      <ListController
        resource="categories"
        perPage={10}
        Context={ContractLCContext}
      >
        <ListView
          title="Danh sách chủ đề"
          actions={
            <div className={commonStyles.flex}>
              <FilterForm
                filters={[
                  {
                    alwaysOn: true,
                    source: '_keyword',
                  },
                ]}
                Context={ContractLCContext}
              >
                <SearchInput placeholder="Tìm kiếm" />
              </FilterForm>
            </div>
          }
          filters={
            <FilterForm Context={ContractLCContext} filters={[]}>
              <Filters />
            </FilterForm>
          }
        >
          <p style={{ display: 'flex', justifyContent: 'flex-end' }}>
            Số lượng: {props.total}
          </p>
          <Datagrid
            Context={ContractLCContext}
            // tabKey="lontrau"
            columns={[
              {
                title: 'Tên Chủ Đề',
                key: 'name',
                dataIndex: 'name',
                sorter: true,
              },
              {
                title: 'Hình Ảnh',
                key: 'image',
                dataIndex: 'image',
                render: link => (
                  <Avatar
                    style={{ width: '120px', height: '60px' }}
                    src={link}
                    size={128}
                    shape="square"
                  />
                ),
              },
              {
                title: 'Người theo dõi',
                key: 'numberFollower',
                dataIndex: 'numberFollower',
                sorter: true,
              },
              {
                title: 'Trạng Thái',
                key: 'status',
                dataIndex: 'status',
                render: text => (text === 0 ? 'Không Hoạt Động' : 'Hoat Động'),
              },
              {
                title: 'Ngày Tạo Mới',
                key: 'createdAt',
                dataIndex: 'createdAt',
                sorter: true,
                render: value => moment(value).format('lll'),
              },
              {
                title: 'Ngày Cập Nhật Mới Nhất',
                key: 'updatedAt',
                dataIndex: 'updatedAt',
                render: (value, record) =>
                  moment(value || record.createdAa).format('lll'),
              },
            ]}
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

CategoryList.defaultProps = {
  layoutSettings: { lontrau: true },
};

export default connect((state, props) => ({
  total: get(state, 'resources.categories.list.total'),
}))(CategoryList);
