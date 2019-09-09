import { Input } from 'antd';
import React from 'react';

const SearchInputCpn = ({ onChange }) => (
  <Input.Search
    placeholder="Tìm Kiếm"
    onSearch={val => onChange({ target: { value: val } })}
    // enterButton
  />
);

const SearchInput = ({ getFieldDecorator }) =>
  getFieldDecorator('_keyword')(<SearchInputCpn />);

export default SearchInput;
