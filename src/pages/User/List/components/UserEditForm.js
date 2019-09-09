import { Button, Icon, Input, notification } from 'antd';
import { formatMessage } from 'umi-plugin-locale';
import React, { useCallback, useState } from 'react';
import classnames from 'classnames';
import router from 'umi/router';
import SelectInput from '@/components/Input/SelectInput';
import commonStyle from '@/common.less';
import userModel from '@/dataModels/user';
import useEditController from '@/core/controllers/useEditController';
import withSimpleForm from '@/components/Form/SimpleForm';

const BasicForm = withSimpleForm({ name: 'contractBasic' });
const { TextArea } = Input;
const openNotificationWithIcon = type => {
  notification[type]({
    message: 'Cập nhật thành công!',
  });
};
const Toolbar = ({ pending }) => (
  <div className={classnames(commonStyle.editFormToolbar, commonStyle.w100)}>
    <div />
    <div className={commonStyle.flex}>
      <Button
        style={{ marginLeft: 18 }}
        type="primary"
        htmlType="submit"
        // loading={pending
        onClick={() => {
          openNotificationWithIcon('success');
        }}
      >
        <Icon type="carry-out" />
        {formatMessage({ id: 'form.label.update' })}
      </Button>
    </div>
  </div>
);

const UserEditForm = ({ basePath, resource, id, redirectOnSuccess }) => {
  const { isLoading, save, record } = useEditController({
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
      <Input
        name={userModel.fullName}
        rules={[
          { required: true, message: 'Tên người dùng không được để trống' },
        ]}
      />

      <SelectInput
        name={userModel.role}
        // mapRecordToInitial={val => val && val.id}
        options={[
          {
            name: 'Người Dùng',
            value: 0,
          },
          {
            name: 'Ký Giả',
            value: 1,
          },
        ]}
      />
      <SelectInput
        name={userModel.realUser}
        // mapRecordToInitial={val => val && val.id}
        options={[
          {
            name: 'Giả',
            value: 0,
          },
          {
            name: 'Thật',
            value: 1,
          },
        ]}
      />

      <SelectInput
        name={userModel.status}
        options={[
          {
            name: 'Hoạt Động',
            value: 1,
          },
          {
            name: 'Không Hoạt Động',
            value: 0,
          },
        ]}
      />

      <TextArea placeholder="Tiểu sử người dùng" name={userModel.about} />
    </BasicForm>
  );
};

export default UserEditForm;
