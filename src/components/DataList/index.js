import { List } from 'antd';
import { formatMessage } from 'umi-plugin-locale';
import React, { useCallback, useContext } from 'react';

const DataList = props => {
  const { listOptions, Context } = props;

  const {
    data = {},
    ids = [],
    isLoading,
    setPage,
    page,
    total,
    version,
    perPage,
  } = useContext(Context);

  const handlePageChange = useCallback(
    p => {
      const nBPages = Math.ceil(total / perPage) || 1;

      if (p <= 0 || p > nBPages) {
        throw new Error(
          formatMessage(
            { id: 'ra.navigation.page_out_of_boundaries' },
            {
              p,
            },
          ),
        );
      }
      setPage(p);
    },
    [perPage, total, setPage],
  );

  if (!isLoading && (ids.length === 0 || total === 0)) {
    return null;
  }

  return (
    <List
      itemLayout="vertical"
      dataSource={ids && ids.map(id => data[id])}
      version={version}
      pagination={{
        pageSize: perPage,
        onChange: p => handlePageChange(p),
        total,
        current: page,
      }}
      {...listOptions}
    />
  );
};

export default React.memo(DataList);
