import { Radio } from 'antd';
import React from 'react';

import useConfigData from '@/hooks/useConfigData';

const ConfigRadio = ({
  configKey,
  normalizeOpt = value => value,
  prependOptions = [],
  ...rest
}) => {
  const { data } = useConfigData(configKey);
  let normalizeData = [];
  if (Array.isArray(data)) {
    normalizeData = data.map(item => normalizeOpt(item));
  }
  return (
    <Radio.Group {...rest}>
      {prependOptions
        .map(item => (
          <Radio.Button key={item.value} value={item.value}>
            {item.name}
          </Radio.Button>
        ))
        .concat(
          normalizeData.map(item => (
            <Radio.Button key={item.value} value={item.value}>
              {item.name}
            </Radio.Button>
          )),
        )}
    </Radio.Group>
  );
};

export default ConfigRadio;
