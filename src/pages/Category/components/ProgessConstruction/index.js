import { formatMessage } from 'umi-plugin-locale';
import React, { useCallback } from 'react';
import { Menu, Dropdown, Icon, Button, DatePicker, Input } from 'antd';
import classnames from 'classnames';
import moment from 'moment';

import commonStyle from '@/common.less';

import Datagrid from '@/containers/List/components/Datagrid';
import ListController from '@/core/controllers/ListController';
import Resource from '@/core/Resource';

import withSimpleForm from '@/components/Form/SimpleForm';
import useEditController from '@/core/controllers/useEditController';
import constructionModel from '@/dataModels/construction';
import SelectInput from '@/components/Input/SelectInput';
import StandardFileInput from '@/components/Input/StandardFileInput';

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
        {formatMessage({ id: 'Cập nhật' })}
      </Button>
    </div>
  </div>
);
const ProgessForm = ({ basePath, resource, id, redirectOnSuccess }) => {
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
    <Resource resource="construction" hasList hasEdit hasCreate hasShow>
      <ListController resource="construction">
        <BasicForm
          isLoading={isLoading}
          save={save}
          record={record}
          resource={resource}
        >
          <Toolbar />
          {/* <DatePicker
        className={commonStyle.w100}
        mapRecordToInitial={val => (val && moment(val)) || null}
        rules={[{ required: true, message: 'Ngày ký hợp đồng không được để trống' }]}
        normalize={val => (val && moment(val)) || null}
      />
      <Input
        name={constructionModel.realNumbers}
        rules={[{ required: true, message: 'Số hợp đồng không được để trống' }]}
      />
      <Input
        name={constructionModel.realNumbersCommit}
        rules={[{ required: true, message: 'Tên hợp đồng không được để trống' }]}
      /> */}
          {/* <div className={commonStyle.flexSpaceBetween}>
        <Icon type="check-square" />
      </div> */}
          {/* <Input
        name={constructionModel.suppliesProvided}
        rules={[{ required: true, message: 'Tên hợp đồng không được để trống' }]}
      />
      <Input
        name={constructionModel.progressAchieved}
        rules={[{ required: true, message: 'Tên hợp đồng không được để trống' }]}
      />
      <Input
        name={constructionModel.requestment}
        rules={[{ required: true, message: 'Tên hợp đồng không được để trống' }]}
      />
      <SelectInput
          name={constructionModel.requestmentUnit}
          mapRecordToInitial={val => val && val.id}
          options={[
            {
              name: 'Ban vật tư',
              value: '1',
            },
            {
              name: 'Ban vật liệu',
              value: '2',
            },
            {
              name: 'Ban phát triển',
              value: '3',
            },
          ]}
        />
        <Resource hasList hasCreate resource="file/contractFileAttach">
          <StandardFileInput
            resource="file/contractFileAttach"
            getPermanentFilter={getPermanentFilter}
            label={formatMessage({
              id: 'form.label.attachFile',
            })}
          />
        </Resource> */}
        </BasicForm>
      </ListController>
    </Resource>
  );
};

export default ProgessForm;
