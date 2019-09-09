import 'react-id-swiper/lib/styles/css/swiper.css';
import moment from 'moment';
import { Button, Drawer, Modal, Icon } from 'antd';
import React, { useState, useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import get from 'lodash/get';
import router from 'umi/router';
import Datagrid from '@/containers/List/components/Datagrid';
import Filters from '@/pages/Post/components/Filters';
import ListController from '@/core/controllers/ListController';
import ListView from '@/containers/List';
import SearchInput from '@/components/Input/SearchInput';
import commonStyles from '@/common.less';
import FilterForm from '@/core/ui/list/FilterForm';
import useDrawer from '@/hooks/useDrawer';
import drawerContents from '@/pages/Post/drawerContents';

export const PostContext = React.createContext();
const PostList = ({ basePath, resource, id, redirectOnSuccess, ...props }) => {
  const [visible, setVisible] = useState(false);
  const {
    handleCloseDrawer,
    openDrawer,
    drawerContent,
    drawerState,
    version,
  } = useDrawer(drawerContents, false);
  const [currentId, updateCurrentId] = useState(null);
  console.log('render Status ', props);
  return (
    <ListController
      visible={visible}
      resource="posts"
      perPage={10}
      Context={PostContext}
      total
    >
      <ListView
        visible={visible}
        title="Danh sách bài viết"
        actions={
          <div className={commonStyles.flex}>
            <FilterForm
              filters={[
                {
                  alwaysOn: true,
                  source: '_keyword',
                },
              ]}
              Context={PostContext}
            >
              <SearchInput placeholder="Tìm kiếm bài viết" />
            </FilterForm>
            <Button
              type="primary"
              style={{ marginLeft: 9 }}
              onClick={() => {
                router.push('/posts/new-posts');
              }}
            >
              <Icon type="plus" />
              Thêm mới
            </Button>
          </div>
        }
        filters={
          <FilterForm Context={PostContext} filters={[]}>
            <Filters />
          </FilterForm>
        }
      >
        <p style={{ display: 'flex', justifyContent: 'flex-end' }}>
          Số lượng: {props.total}
        </p>
        <Datagrid
          vCount={visible}
          Context={PostContext}
          columns={[
            {
              title: 'Tên Ký Giả',
              key: 'author.fullName',
              dataIndex: 'author.fullName',
            },
            {
              title: 'Chủ Đề',
              key: 'categories',
              dataIndex: 'categories',
              render: categories =>
                categories.map(category => category.name).join(),
            },
            {
              title: 'Tiêu Đề',
              key: 'title',
              dataIndex: 'title',
            },
            {
              title: 'Thời Gian Đăng',
              key: 'createdAt',
              dataIndex: 'createdAt',
              sorter: true,
              render: text => (
                <div style={{ width: '130px' }}>
                  {moment(text).format('lll')}
                </div>
              ),
            },
            {
              title: 'Số Lượt Report',
              key: 'reportNumber',
              dataIndex: 'reportNumber',
              sorter: true,
            },
            {
              title: 'Trạng Thái',
              key: 'status',
              dataIndex: 'status',
              render: (value, record) => {
                if (record.status === 0) {
                  return 'Chờ Duyệt';
                }
                if (record.status === 1) {
                  return 'Duyệt';
                }
                if (record.status === 2) {
                  return 'Từ Chối';
                }
                return 'Không Xác Định';
              },
            },
            {
              title: 'Chỉnh Sửa',
              key: 'status',
              dataIndex: 'status',
              render: (value, record) => (
                <Button
                  onClick={() => {
                    router.push(`posts/update-posts/${record.id}`);
                  }}
                >
                  <Icon type="edit" />
                  Chỉnh Sửa
                </Button>
              ),
            },
          ]}
          // onRow: Get value in a row
          tableOptions={{
            onRow: record => ({
              onClick: () => {
                updateCurrentId(record.id);
              },
            }),
          }}
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

PostList.defaultProps = {
  layoutSettings: { lontrau: true },
};

export default connect((state, props) => ({
  total: get(state, `resources.posts.list.total`),
}))(PostList);
