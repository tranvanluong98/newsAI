import { formatMessage } from 'umi-plugin-locale';
import React, { useCallback } from 'react';
import { Menu, Dropdown, Icon, Button, DatePicker } from 'antd';
import classnames from 'classnames';
import moment from 'moment';

import commonStyle from '@/common.less';

import Datagrid from '@/containers/List/components/Datagrid';
import ListController from '@/core/controllers/ListController';
import Resource from '@/core/Resource';

import withSimpleForm from '@/components/Form/SimpleForm';
import useEditController from '@/core/controllers/useEditController';
import constructionModel from '@/dataModels/construction';

const BasicForm = withSimpleForm({ name: 'activityConstructionBasic' });

const toolMenu = (
  <Menu>
    <Menu.Item>{formatMessage({ id: 'Xuất hợp đồng ra Word' })}</Menu.Item>
    <Menu.Item>{formatMessage({ id: 'Chọn mẫu hợp đồng' })}</Menu.Item>
    <Menu.Item>{formatMessage({ id: 'Thêm phụ lục hợp đồng' })}</Menu.Item>
  </Menu>
);
const Toolbar = ({ pending }) => (
  <div className={classnames(commonStyle.editFormToolbar, commonStyle.w100)}>
    <div />
    <div className={commonStyle.flex}>
      <Dropdown overlay={toolMenu}>
        <div className={commonStyle.flexAlignItemCenter}>
          {formatMessage({ id: 'Cộng cụ' })} <Icon type="down" />
        </div>
      </Dropdown>
      <Button
        style={{ marginLeft: 18 }}
        type="primary"
        htmlType="submit"
        loading={pending}
      >
        {formatMessage({ id: 'Tạo nhiệm vụ' })}
      </Button>
    </div>
  </div>
);
const ActivityForm = ({ basePath, resource, id, redirectOnSuccess }) => {
  const { isLoading, save, record } = useEditController({
    basePath,
    resource,
    id,
    redirect: redirectOnSuccess,
  });
  const getPermanentFilter = useCallback(
    r => ({
      contractId: r.id,
    }),
    [],
  );
  return (
    <Resource resource="progess" hasList hasEdit hasCreate hasShow>
      <ListController resource="progess">
        <BasicForm
          isLoading={isLoading}
          save={save}
          record={record}
          resource={resource}
        >
          <Toolbar />
          <DatePicker
            className={commonStyle.w100}
            mapRecordToInitial={val => (val && moment(val)) || null}
            // name={record.realEditDate}
            rules={[
              {
                required: true,
                message: 'Ngày ký hợp đồng không được để trống',
              },
            ]}
            normalize={val => (val && moment(val)) || null}
          />
        </BasicForm>
      </ListController>
    </Resource>
  );
};

export default ActivityForm;
