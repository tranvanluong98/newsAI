import { Button, DatePicker, Dropdown, Icon, Input, Menu } from 'antd';
import { formatMessage } from 'umi-plugin-locale';
import React, { useCallback } from 'react';
import classnames from 'classnames';
import moment from 'moment';

import Resource from '@/core/Resource';
import SelectInput from '@/components/Input/SelectInput';
import StandardFileInput from '@/components/Input/StandardFileInput';
import commonStyle from '@/common.less';
import contractModel from '@/dataModels/contract';
import useEditController from '@/core/controllers/useEditController';
import withSimpleForm from '@/components/Form/SimpleForm';

const BasicForm = withSimpleForm({ name: 'contractBasic' });

const toolMenu = (
  <Menu>
    <Menu.Item>{formatMessage({ id: 'form.label.exportToDoc' })}</Menu.Item>
    <Menu.Item>{formatMessage({ id: 'form.label.templateSelect' })}</Menu.Item>
    <Menu.Item>{formatMessage({ id: 'form.label.addAppendix' })}</Menu.Item>
  </Menu>
);

const Toolbar = ({ pending }) => (
  <div className={classnames(commonStyle.editFormToolbar, commonStyle.w100)}>
    <div />
    <div className={commonStyle.flex}>
      <Dropdown overlay={toolMenu}>
        <div className={commonStyle.flexAlignItemCenter}>
          {formatMessage({ id: 'form.label.tool' })} <Icon type="down" />
        </div>
      </Dropdown>
      <Button
        style={{ marginLeft: 18 }}
        type="primary"
        htmlType="submit"
        loading={pending}
      >
        {formatMessage({ id: 'form.label.update' })}
      </Button>
    </div>
  </div>
);

const ContractEditForm = ({ basePath, resource, id, redirectOnSuccess }) => {
  const { isLoading, save, record } = useEditController({
    basePath,
    resource,
    id,
    redirect: redirectOnSuccess,
  });
  const getPermanentFilter = useCallback(
    r => ({
      contractId: r && r.id,
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
      <Input
        name={contractModel.contractNum}
        rules={[{ required: true, message: 'Số hợp đồng không được để trống' }]}
      />
      <Input
        name={contractModel.contractName}
        rules={[
          { required: true, message: 'Tên hợp đồng không được để trống' },
        ]}
      />
      <DatePicker
        className={commonStyle.w100}
        mapRecordToInitial={val => (val && moment(val)) || null}
        name={contractModel.signingDate}
        rules={[
          { required: true, message: 'Ngày ký hợp đồng không được để trống' },
        ]}
        normalize={val => (val && moment(val)) || null}
      />
      <DatePicker
        className={commonStyle.w100}
        mapRecordToInitial={val => (val && moment(val)) || null}
        name={contractModel.implementDate}
        rules={[
          {
            required: true,
            message: 'Ngày thực hiện hợp đồng không được để trống',
          },
        ]}
        normalize={val => (val && moment(val)) || null}
      />
      <DatePicker
        className={commonStyle.w100}
        mapRecordToInitial={val => (val && moment(val)) || null}
        name={contractModel.expectFinishDate}
        rules={[
          {
            required: true,
            message: 'Ngày thực hiện hợp đồng không được để trống',
          },
        ]}
        normalize={val => (val && moment(val)) || null}
      />
      <DatePicker
        className={commonStyle.w100}
        mapRecordToInitial={val => (val && moment(val)) || null}
        name={contractModel.takeOverDate}
        rules={[
          { required: true, message: 'Ngày nghiệm thu không được để trống' },
        ]}
        normalize={val => moment(val)}
      />
      <DatePicker
        className={commonStyle.w100}
        mapRecordToInitial={val => (val && moment(val)) || null}
        name={contractModel.liquidateDate}
        rules={[
          { required: true, message: 'Ngày thanh lý không được để trống' },
        ]}
        normalize={val => (val && moment(val)) || null}
      />
      <DatePicker
        className={commonStyle.w100}
        mapRecordToInitial={val => (val && moment(val)) || null}
        name={contractModel.realStartDate}
        normalize={val => (val && moment(val)) || null}
      />
      <DatePicker
        className={commonStyle.w100}
        mapRecordToInitial={val => (val && moment(val)) || null}
        name={contractModel.realFinishDate}
        normalize={val => (val && moment(val)) || null}
      />
      <Input
        name={contractModel.contractValue}
        rules={[
          { required: true, message: 'Giá trị hợp đồng không được để trống' },
        ]}
      />
      <SelectInput
        name={contractModel.package}
        mapRecordToInitial={val => val && val.id}
        options={[
          {
            name: 'Xây thô',
            value: 'rawBulding',
          },
          {
            name: 'Sơn bả',
            value: 'painting',
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
      </Resource>
      <Resource hasList hasCreate resource="file/contractDocAttach">
        <StandardFileInput
          resource="file/contractDocAttach"
          getPermanentFilter={getPermanentFilter}
          label={formatMessage({
            id: 'form.label.attachDoc',
          })}
        />
      </Resource>
    </BasicForm>
  );
};

export default ContractEditForm;
