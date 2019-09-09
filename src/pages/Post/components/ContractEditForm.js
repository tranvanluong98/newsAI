import { Button, DatePicker, Radio, Icon, Input, Menu } from 'antd';
import { formatMessage } from 'umi-plugin-locale';
import React, { useState, useCallback } from 'react';
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
    </BasicForm>
  );
};

export default ContractEditForm;
