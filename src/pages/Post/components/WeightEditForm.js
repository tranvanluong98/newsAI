import { Button, DatePicker, Dropdown, Icon, Input, Menu } from 'antd';
import { formatMessage } from 'umi-plugin-locale';
import React, { useCallback } from 'react';
import classnames from 'classnames';
import moment from 'moment';

import ConfigSelect from '@/components/Input/ConfigSelect';
import FormToolbar from '@/components/Form/FormToolbar';
import NumericInput from '@/components/Input/NumericInput';
import Resource from '@/core/Resource';
import SelectInput from '@/components/Input/SelectInput';
import StandardFileInput from '@/components/Input/StandardFileInput';
import commonStyle from '@/common.less';
import useEditController from '@/core/controllers/useEditController';
import weightModel from '@/dataModels/weight';
import withSimpleForm from '@/components/Form/SimpleForm';

const BasicForm = withSimpleForm({ name: 'weightEditForm' });

const WeightEditForm = ({
  basePath,
  resource,
  id,
  redirectOnSuccess,
  closeDrawer,
}) => {
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
      commonProps={{ closeDrawer }}
    >
      <ConfigSelect
        configKey="costCategory"
        name={weightModel.costCategoryId}
      />
      <ConfigSelect configKey="category" name={weightModel.categoryId} />
      <Input
        name={weightModel.content}
        rules={[{ required: true, message: 'Nội dung không được để trống' }]}
      />
      <NumericInput
        name={weightModel.weight}
        rules={[{ required: true, message: 'Khối lượng không được để trống' }]}
      />
      <NumericInput
        name={weightModel.unitPrice}
        rules={[{ required: true, message: 'Đơn giá không được để trống' }]}
      />
      <NumericInput name={weightModel.totalRawPrice} />
      <NumericInput name={weightModel.vat} />
      <NumericInput name={weightModel.totalAfterTax} />
      <FormToolbar />
    </BasicForm>
  );
};

export default WeightEditForm;
