import { Select } from 'antd';
import React from 'react';

const { Option } = Select;

const SelectInput = ({ options, ...rest }) => (
  <Select {...rest}>
    {options.map(opt => (
      <Option value={opt.value} key={opt.name}>
        {opt.name}
      </Option>
    ))}
  </Select>
);

export default SelectInput;
