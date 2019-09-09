import React from 'react';
import classnames from 'classnames';
import { Select } from 'antd';
import ConfigSelect from '@/components/Input/ConfigSelect';
import commonStyles from '@/common.less';
import RangeDateInput from '@/components/Input/RangeDateInput';
import AsyncSelect from '@/components/Input/AsyncSelect';

const { Option } = Select;

const id2Field = {
  authorId: (
    <AsyncSelect
      configKey="users/user-search-post"
      optPath="data"
      allowClear
      placeholder="Lọc Theo Kí Giả"
      showSearch
      style={{ marginRight: 21, flexBasis: '366px' }}
    />
  ),
  categoryId: (
    <ConfigSelect
      allowClear
      placeholder="Lọc Theo Chủ Đề"
      configKey="categories"
      style={{ marginRight: 21, flexBasis: '366px' }}
      normalizeOpt={val => ({ name: val.name, value: val.id })}
    />
  ),
  displayType: (
    <Select
      allowClear
      placeholder="Loại Bài Viết"
      style={{ marginRight: 21, flexBasis: '366px' }}
    >
      <Option value={1}> Tin tức mạng xã hội</Option>
      <Option value={0}> Tin tức báo chí</Option>
    </Select>
  ),
  status: (
    <Select
      allowClear
      placeholder="Trạng Thái Duyệt"
      style={{ marginRight: 21, flexBasis: '366px' }}
    >
      <Option value={2}> Từ Chối</Option>
      <Option value={1}> Duyệt</Option>
      <Option value={0}> Chờ Duyệt</Option>
    </Select>
  ),
  createdTime: (
    <RangeDateInput style={{ marginRight: 21, flexBasis: '366px' }} />
  ),
};

const Filters = ({ initialValues, getFieldDecorator }) => (
  <div className={classnames(commonStyles.flex)}>
    <div className={classnames(commonStyles.flex, commonStyles.flexGrow1)}>
      {getFieldDecorator('categoryId', {
        initialValue: initialValues.categoryId,
      })(id2Field.categoryId)}

      {getFieldDecorator('status', {
        initialValue: initialValues.status,
      })(id2Field.status)}

      {getFieldDecorator('displayType', {
        initialValue: initialValues.displayType,
      })(id2Field.displayType)}

      {getFieldDecorator('createdTime', {
        initialValue: initialValues.createdTime,
        normalize: values => values,
      })(id2Field.createdTime)}

      {getFieldDecorator('authorId', {
        initialValue: initialValues.authorId,
        normalize: values => values,
      })(id2Field.authorId)}
    </div>
  </div>
);

export default Filters;
