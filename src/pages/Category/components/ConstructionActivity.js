import { Button, DatePicker, Dropdown, Icon, Menu } from 'antd';
import { formatMessage } from 'umi-plugin-locale';
import React, { useCallback } from 'react';
import classnames from 'classnames';
import moment from 'moment';

import commonStyle from '@/common.less';
import constructionModel from '@/dataModels/construction';
import useEditController from '@/core/controllers/useEditController';
import withSimpleForm from '@/components/Form/SimpleForm';

const BasicForm = withSimpleForm({ name: 'constructionBasic' });

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
const ConstructionActivity = ({
  basePath,
  resource,
  id,
  redirectOnSuccess,
}) => {
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
    <BasicForm
      isLoading={isLoading}
      save={save}
      record={record}
      resource={resource}
    >
      <Toolbar />
      {/* <div className={commonStyle.constructionDrawer}>
        <div className={commonStyle.leftConstructionDrawer}>{record.realEditDate}</div>
        <div className={commonStyle.rightConstructionDrawer}> */}
      <div className={commonStyle.leftConstructionDrawer}>
        {record.realEditDate.name}
      </div>
      <DatePicker
        className={commonStyle.w100}
        mapRecordToInitial={val => (val && moment(val)) || null}
        name={constructionModel.realEditDate}
        rules={[
          { required: true, message: 'Ngày ký hợp đồng không được để trống' },
        ]}
        normalize={val => (val && moment(val)) || null}
      />
    </BasicForm>
  );
};

export default ConstructionActivity;
