import { Button, DatePicker, useState, Input } from 'antd';
import { formatMessage } from 'umi-plugin-locale';
import React from 'react';
import classnames from 'classnames';
import moment from 'moment';

import SelectInput from '@/components/Input/SelectInput';
import commonStyle from '@/common.less';
import contractModel from '@/dataModels/contract';
import useCreateController from '@/core/controllers/useCreateController';
import withSimpleForm from '@/components/Form/SimpleForm';

const BasicForm = withSimpleForm({ name: 'contractBasic' });

const Toolbar = ({ pending }) => (
  <div className={classnames(commonStyle.editFormToolbar, commonStyle.w100)}>
    <div />
    <div className={commonStyle.flex}>
      <Button
        style={{ marginLeft: 18 }}
        type="primary"
        htmlType="submit"
        loading={pending}
      >
        Thêm Mới
      </Button>
    </div>
  </div>
);

const PostCreateForm = ({ basePath, resource, id, redirectOnSuccess }) => {
  const { isLoading, save, record = {} } = useCreateController({
    basePath,
    resource,
    id,
    redirect: redirectOnSuccess,
  });
  return (
    <BasicForm
      isLoading={isLoading}
      save={save}
      record={record}
      resource={resource}
    >
      <Toolbar />

      <DatePicker
        className={commonStyle.w100}
        mapRecordToInitial={val => val && moment(val)}
        name={contractModel.implementDate}
        rules={[
          {
            required: true,
            message: 'Ngày thực hiện hợp đồng không được để trống',
          },
        ]}
        normalize={val => moment(val)}
      />
      <DatePicker
        className={commonStyle.w100}
        mapRecordToInitial={val => val && moment(val)}
        name={contractModel.expectFinishDate}
        rules={[
          {
            required: true,
            message: 'Ngày thực hiện hợp đồng không được để trống',
          },
        ]}
        normalize={val => moment(val)}
      />
      <DatePicker
        className={commonStyle.w100}
        mapRecordToInitial={val => val && moment(val)}
        name={contractModel.takeOverDate}
        rules={[
          { required: true, message: 'Ngày nghiệm thu không được để trống' },
        ]}
        normalize={val => moment(val)}
      />
      <DatePicker
        className={commonStyle.w100}
        mapRecordToInitial={val => val && moment(val)}
        name={contractModel.liquidateDate}
        rules={[
          { required: true, message: 'Ngày thanh lý không được để trống' },
        ]}
        normalize={val => moment(val)}
      />
      <DatePicker
        className={commonStyle.w100}
        mapRecordToInitial={val => val && moment(val)}
        name={contractModel.realStartDate}
        normalize={val => moment(val)}
      />
      <DatePicker
        className={commonStyle.w100}
        mapRecordToInitial={val => val && moment(val)}
        name={contractModel.realFinishDate}
        normalize={val => moment(val)}
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
    </BasicForm>
  );
};

export default PostCreateForm;
