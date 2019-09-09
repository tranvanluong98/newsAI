import 'react-id-swiper/lib/styles/css/swiper.css';
import moment from 'moment';
import { Drawer, Avatar } from 'antd';
import React from 'react';
import { connect } from 'react-redux';
import get from 'lodash/get';
import Datagrid from '@/containers/List/components/Datagrid';
import ListController from '@/core/controllers/ListController';
import ListView from '@/containers/List';
import Resource from '@/core/Resource';
import SearchInput from '@/components/Input/SearchInput';
import commonStyles from '@/common.less';
import FilterForm from '@/core/ui/list/FilterForm';
import drawerContents from '@/pages/Project/Contract/All/drawerContents';
import useDrawer from '@/hooks/useDrawer';

export const ContractLCContext = React.createContext();

const GroupNewsList = ({ ...props }) => {
  const { handleCloseDrawer, drawerContent, drawerState, version } = useDrawer(
    drawerContents,
    false,
  );

  return (
    <Resource resource="groups" hasList hasEdit hasCreate hasShow>
      <ListController
        resource="groups"
        perPage={10}
        Context={ContractLCContext}
      >
        <ListView
          title="Danh sách nhóm tin"
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
        >
          <p style={{ display: 'flex', justifyContent: 'flex-end' }}>
            Số lượng: {props.total}
          </p>
          <Datagrid
            Context={ContractLCContext}
            columns={[
              {
                title: 'Tên Nhóm Tin',
                key: 'name',
                dataIndex: 'name',
              },
              {
                title: 'Hình Ảnh',
                key: 'image.small',
                dataIndex: 'image.small',

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
                title: 'Ngày Tạo Mới',
                key: 'createdAt',
                dataIndex: 'createdAt',
                render: value => moment(value).format('lll'),
                sorter: true,
              },
              {
                title: 'Ngày cập nhật mới nhất',
                key: 'updatedAt',
                dataIndex: 'updatedAt',
                render: (value, record) =>
                  moment(value || record.createdAt).format('lll'),
                sorter: true,
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

GroupNewsList.defaultProps = {
  layoutSettings: { lontrau: true },
};

export default connect((state, props) => ({
  total: get(state, 'resources.groups.list.total'),
}))(GroupNewsList);
