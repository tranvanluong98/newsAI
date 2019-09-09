import 'react-id-swiper/lib/styles/css/swiper.css';
import { Drawer, Select, Button, Icon } from 'antd';
import React from 'react';
import moment from 'moment';
import { useDispatch } from 'dva';
import { connect } from 'react-redux';
import get from 'lodash/get';
import Filters from '@/pages/User/List/components/Filters';
import Datagrid from '@/containers/List/components/Datagrid';
import ListController from '@/core/controllers/ListController';
import ListView from '@/containers/List';
import SearchInput from '@/components/Input/SearchInput';
import commonStyles from '@/common.less';
import FilterForm from '@/core/ui/list/FilterForm';
import drawerContents from '@/pages/User/List/drawerContents';
import useDrawer from '@/hooks/useDrawer';
import dataProvider, { UPDATE_STATUS_USER } from '@/services/dataProvider';
import { refreshViewResource } from '@/core/actions/resourceActions';

const handleChangeRole = (id, dispatch) => async value => {
  await dataProvider(UPDATE_STATUS_USER, 'users/status', {
    id,
    role: value,
  });
  dispatch(refreshViewResource('users'));
};
const handleChangeRealUser = (id, dispatch) => async value => {
  await dataProvider(UPDATE_STATUS_USER, 'users/status', {
    id,
    realUser: value,
  });
  dispatch(refreshViewResource('users'));
};
const handleChangeStatus = (id, dispatch) => async value => {
  await dataProvider(UPDATE_STATUS_USER, 'users/status', {
    id,
    status: value,
  });
  dispatch(refreshViewResource('users'));
};

export const ContractLCContext = React.createContext();
const { Option } = Select;
const AllProject = ({ ...props }) => {
  const {
    handleCloseDrawer,
    openDrawer,
    drawerContent,
    drawerState,
    version,
  } = useDrawer(drawerContents, false);

  const dispatch = useDispatch();

  return (
    <ListController resource="users" perPage={10} Context={ContractLCContext}>
      <ListView
        title="Danh sách người dùng"
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
          columns={[
            {
              title: 'Tên User',
              key: 'fullName',
              dataIndex: 'fullName',
              sorter: true,
            },
            {
              title: 'Loại',
              key: 'role',
              dataIndex: 'role',
              render: (text, record) => (
                <Select
                  value={record.role}
                  style={{ width: '100%' }}
                  onChange={handleChangeRole(record.id, dispatch)}
                >
                  <Option value={0}>Người Dùng</Option>
                  <Option value={1}>Ký Giả</Option>
                </Select>
              ),
            },
            {
              title: 'Kiểu Người Dùng',
              key: 'realUser',
              dataIndex: 'realUser',
              render: (value, record) => (
                <Select
                  value={value}
                  style={{ width: '100%' }}
                  onChange={handleChangeRealUser(record.id, dispatch)}
                >
                  <Option value={0}>Giả</Option>
                  <Option value={1}>Thật</Option>
                </Select>
              ),
            },
            {
              title: 'Trạng Thái',
              key: 'status',
              dataIndex: 'status',
              render: (value, record) => (
                <Select
                  value={value}
                  style={{ width: '100%' }}
                  onChange={handleChangeStatus(record.id, dispatch)}
                >
                  <Option value={1}>Hoạt Động</Option>
                  <Option value={0}>Không Hoạt Động</Option>
                </Select>
              ),
            },
            {
              title: 'Ngày Tạo',
              key: 'createdAt',
              dataIndex: 'createdAt',
              sorter: true,
              sortDirections: ['descend', 'ascend'],
              render: dateStr => moment(dateStr).format('lll'),
            },
            {
              title: 'Thao Tác',
              render: (text, record) => (
                <Button
                  onClick={() =>
                    openDrawer(
                      'edit',
                      {
                        id: record.id,
                      },
                      record.id,
                    )
                  }
                >
                  <Icon type="edit" />
                  Chỉnh Sửa
                </Button>
              ),
            },
          ]}
        />
      </ListView>
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
    </ListController>
  );
};

AllProject.defaultProps = {
  layoutSettings: { lontrau: true },
};

export default connect((state, props) => ({
  total: get(state, 'resources.users.list.total'),
}))(AllProject);
