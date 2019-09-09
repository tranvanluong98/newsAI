import { Select } from 'antd';
import React from 'react';

import useConfigData from '@/hooks/useConfigData';

const ConfigMultiSelect = ({ configKey, normalizeOpt, ...rest }) => {
  const { data } = useConfigData(configKey);
  let normalizeData = [...data];
  if (Array.isArray(data) && typeof normalizeOpt === 'function') {
    normalizeData = data.map(item => normalizeOpt(item));
  }
  return (
    <Select {...rest} mode="multiple">
      {normalizeData.map(item => (
        <Select.Option
          key={item.value}
          defaultValue={item.value}
          value={item.value}
        >
          {item.name}
        </Select.Option>
      ))}
    </Select>
  );
};

export default ConfigMultiSelect;
