import { Button, Icon } from 'antd';
import { formatMessage } from 'umi-plugin-locale';
import React, { useState } from 'react';
import classnames from 'classnames';

import { POST } from '@/core/dataFetchActions';
import commonStyles from '@/common.less';
import useDataProvider from '@/hooks/useDataProvider';

const FileLoader = ({
  file,
  resource,
  icon = <Icon style={{ fontSize: 20 }} type="file" />,
  onSuccess,
  autoHide = true,
}) => {
  const [visibility, updateVisibility] = useState(true);
  const { loading, error, retry } = useDataProvider({
    type: POST,
    resource,
    params: {
      title: file.name,
      type: file.type.split('/')[0],
      rawFile: file,
    },
    init: true,
    onSuccess: () => {
      if (autoHide) {
        const { timeOut = 1000 } = autoHide;
        setTimeout(() => {
          updateVisibility(false);
        }, timeOut);
      }
      onSuccess();
    },
  });

  return (
    <div
      style={{
        marginTop: 10,
        marginBottom: 10,
        padding: '10px 9.79px 15px',
        border: '1px solid rgba(0, 0, 0, 0.2)',
        display: visibility ? 'block' : 'none',
      }}
    >
      <div
        className={classnames(
          commonStyles.flexSpaceBetween,
          commonStyles.flexAlignItemCenter,
        )}
      >
        <div className={commonStyles.flexSpaceBetween}>
          <div style={{ marginRight: 10, display: 'inline-block' }}>{icon}</div>
          {file.name}
        </div>
        {loading ? (
          <Icon type="loading" />
        ) : (
          <Icon className={commonStyles.success} type="check-circle" />
        )}
      </div>
      {error && (
        <div className={commonStyles.flex}>
          <span className={commonStyles.warning}>
            {formatMessage({
              id: 'app.result.error.common',
            })}
          </span>
          <Button className={commonStyles.iconBtn} onClick={retry}>
            <Icon type="redo" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default FileLoader;
