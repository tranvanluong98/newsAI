import { Button, Icon } from 'antd';
import React from 'react';
import classnames from 'classnames';
import moment from 'moment';

import { formatMessage } from 'umi-plugin-locale';
import { dateFormat } from '@/config';
import fileModel from '@/dataModels/file';
import userModel from '@/dataModels/user';

import commonStyles from '@/common.less';
import styles from './index.less';

const typeMapIcons = {
  pdf: <Icon style={{ fontSize: 20 }} type="file-pdf" />,
  folder: <Icon style={{ fontSize: 20 }} type="folder" />,
};

const FileDisplay = ({ data, style }) => {
  const typeIcon = typeMapIcons[data[fileModel.type]];
  return (
    <div
      className={classnames(styles.root, commonStyles.flexSpaceBetween)}
      style={style}
    >
      <div className={commonStyles.flex}>
        <div className={styles.iconType}>{typeIcon}</div>
        <div className={styles.flexColumn}>
          <a href={data[fileModel.link]} className={styles.title}>
            {data[fileModel.title]}
          </a>
          <div className={styles.meta}>
            <div>{moment(data[fileModel.createdDate]).format(dateFormat)}</div>
            <div>{data[fileModel.author[userModel.username]]}</div>
          </div>
        </div>
      </div>
      <div
        className={classnames(
          commonStyles.flexSpaceBetween,
          commonStyles.flexColumn,
        )}
      >
        <span style={{ textAlign: 'right' }}>{data[fileModel.size]}</span>
        <Button className={styles.deleteButton}>
          {formatMessage({
            id: 'button.delete',
          })}
        </Button>
      </div>
    </div>
  );
};

export default FileDisplay;
