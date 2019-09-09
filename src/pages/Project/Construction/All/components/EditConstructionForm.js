import { Button, DatePicker, Dropdown, Icon, Input, Menu } from 'antd';
import { formatMessage } from 'umi-plugin-locale';
import React, { useCallback } from 'react';
import classnames from 'classnames';
import moment from 'moment';

import Resource from '@/core/Resource';
import SelectInput from '@/components/Input/SelectInput';
import StandardFileInput from '@/components/Input/StandardFileInput';
import commonStyle from '@/common.less';
import useEditController from '@/core/controllers/useEditController';
import withSimpleForm from '@/components/Form/SimpleForm';
import constructionModel from '@/dataModels/construction';

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
        {formatMessage({ id: 'Cập nhật' })}
      </Button>
    </div>
  </div>
);

const EditConstructionForm = ({
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
        {record.realEditDate}
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
      <Input
        name={constructionModel.realNumbers}
        rules={[{ required: true, message: 'Số hợp đồng không được để trống' }]}
      />
      <Input
        name={constructionModel.realNumbersCommit}
        rules={[
          { required: true, message: 'Tên hợp đồng không được để trống' },
        ]}
      />
      {/* <div className={commonStyle.flexSpaceBetween}>
        <Icon type="check-square" />
      </div> */}
      <Input
        name={constructionModel.suppliesProvided}
        rules={[
          { required: true, message: 'Tên hợp đồng không được để trống' },
        ]}
      />
      <Input
        name={constructionModel.progressAchieved}
        rules={[
          { required: true, message: 'Tên hợp đồng không được để trống' },
        ]}
      />
      <Input
        name={constructionModel.requestment}
        rules={[
          { required: true, message: 'Tên hợp đồng không được để trống' },
        ]}
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
      </Resource>
      {/* <DatePicker
          className={commonStyle.w100}
          mapRecordToInitial={val => (val && moment(val)) || null}
          name={contractModel.signingDate}
          rules={[{ required: true, message: 'Ngày ký hợp đồng không được để trống' }]}
          normalize={val => (val && moment(val)) || null}
        />
        <DatePicker
          className={commonStyle.w100}
          mapRecordToInitial={val => (val && moment(val)) || null}
          name={contractModel.implementDate}
          rules={[{ required: true, message: 'Ngày thực hiện hợp đồng không được để trống' }]}
          normalize={val => (val && moment(val)) || null}
        />
        <DatePicker
          className={commonStyle.w100}
          mapRecordToInitial={val => (val && moment(val)) || null}
          name={contractModel.expectFinishDate}
          rules={[{ required: true, message: 'Ngày thực hiện hợp đồng không được để trống' }]}
          normalize={val => (val && moment(val)) || null}
        />
        <DatePicker
          className={commonStyle.w100}
          mapRecordToInitial={val => (val && moment(val)) || null}
          name={contractModel.takeOverDate}
          rules={[{ required: true, message: 'Ngày nghiệm thu không được để trống' }]}
          normalize={val => moment(val)}
        />
        <DatePicker
          className={commonStyle.w100}
          mapRecordToInitial={val => (val && moment(val)) || null}
          name={contractModel.liquidateDate}
          rules={[{ required: true, message: 'Ngày thanh lý không được để trống' }]}
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
          rules={[{ required: true, message: 'Giá trị hợp đồng không được để trống' }]}
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
        </Resource> */}
      {/* </div>
      </div> */}
    </BasicForm>
  );
};

export default EditConstructionForm;
