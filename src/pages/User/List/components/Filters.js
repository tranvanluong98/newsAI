import React from 'react';
import classnames from 'classnames';
import { Select } from 'antd';
import ConfigRadio from '@/components/Input/ConfigRadio';
import ConfigSelect from '@/components/Input/ConfigSelect';
import commonStyles from '@/common.less';

const { Option } = Select;
const id2Field = {
  role: (
    <Select
      allowClear
      placeholder="Loại"
      style={{ marginRight: 21, flexBasis: '366px' }}
    >
      <Option value={1}> Ký Giả</Option>
      <Option value={0}> Người Dùng</Option>
    </Select>
  ),
  realUser: (
    <Select
      allowClear
      placeholder="Kiểu"
      style={{ marginRight: 21, flexBasis: '366px' }}
    >
      <Option value={1}> Thật</Option>
      <Option value={0}> Giả</Option>
    </Select>
  ),
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
      {getFieldDecorator('role', {
        initialValue: initialValues.role,
      })(id2Field.role)}
      {getFieldDecorator('realUser', {
        initialValue: initialValues.realUser,
      })(id2Field.realUser)}
      {getFieldDecorator('status', {
        initialValue: initialValues.status,
      })(id2Field.status)}
    </div>
    <div className={commonStyles.flexShrink0}>
      {/* {getFieldDecorator('statusId', {
        initialValue: initialValues.statusId,
      })(id2Field.statusId)} */}
    </div>
  </div>
);

export default Filters;
