import React from 'react';
import classnames from 'classnames';
import { Select } from 'antd';
import commonStyles from '@/common.less';

const { Option } = Select;
const id2Field = {
  status: (
    <Select
      allowClear
      placeholder="Trạng Thái"
      style={{ marginRight: 21, flexBasis: '366px' }}
    >
      <Option value={1}> Hoạt Động</Option>
      <Option value={0}> Không Hoạt Động</Option>
    </Select>
  ),
};

const Filters = ({ initialValues, getFieldDecorator }) => (
  <div className={classnames(commonStyles.flex)}>
    <div className={classnames(commonStyles.flex, commonStyles.flexGrow1)}>
      {getFieldDecorator('status', {
        initialValue: initialValues.status,
      })(id2Field.status)}
    </div>
  </div>
);

export default Filters;
