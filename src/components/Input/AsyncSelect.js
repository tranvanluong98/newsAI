import { Select, Spin } from 'antd';
import React, { useState, useCallback } from 'react';
import debounce from 'lodash/debounce';
import get from 'lodash/get';

import useDataProvider from '@/hooks/useDataProvider';
import { GET } from '@/core/dataFetchActions';

const AsyncSelect = ({
  configKey,
  optPath,
  normalizeOpt = value => value,
  valueSrc = 'id',
  nameSrc = 'fullName',
  ...rest
}) => {
  const [data, updateData] = useState([]);
  const { apiCall, loading } = useDataProvider({
    type: GET,
    resource: configKey,
  });

  const fetchOptions = useCallback(
    debounce(async keyWord => {
      try {
        const res = await apiCall({ keyword: keyWord });
        const newOpts = get(res, optPath || 'data.items');
        if (Array.isArray(newOpts)) {
          updateData(newOpts.map(opt => normalizeOpt(opt)));
        } else {
          updateData([]);
        }
      } catch (err) {
        updateData([]);
      }
    }, 500),
    [apiCall, normalizeOpt, optPath],
  );

  return (
    <Select
      notFoundContent={loading ? <Spin size="small" /> : 'Trống'}
      onSearch={fetchOptions}
      filterOption={false}
      {...rest}
    >
      {data.map(d => (
        <Select.Option key={get(d, nameSrc)} value={get(d, valueSrc)}>
          {get(d, nameSrc)}
        </Select.Option>
      ))}
    </Select>
  );
};

export default AsyncSelect;
