import { Button } from 'antd';
import { formatMessage } from 'umi-plugin-locale';
import React, { useCallback } from 'react';
import classnames from 'classnames';

import commonStyles from '@/common.less';
import useDeleteController from '@/core/controllers/useDeleteController';
import useEditController from '@/core/controllers/useEditController';

import styles from './index.less';

const FormToolbar = ({
  save,
  formResource,
  pending,
  record,
  resetFields,
  closeDrawer,
}) => {
  const { deleteRecord } = useDeleteController({ formResource, record });
  const handleSave = useCallback(() => {
    save(record);
  }, [record, save]);
  const handleDelete = useCallback(() => {
    deleteRecord();
    closeDrawer();
  }, [closeDrawer, deleteRecord]);
  const handleCancel = useCallback(() => {
    resetFields();
    closeDrawer();
  }, [closeDrawer, resetFields]);
  return (
    <div
      className={classnames(commonStyles.flexSpaceBetween, styles.formToolbar)}
    >
      <div>
        <Button onClick={handleDelete} className={commonStyles.danger}>
          {formatMessage(
            { id: 'button.delete' },
            { name: formatMessage({ id: 'resources.weight.name' }) },
          )}
        </Button>
      </div>
      <div>
        <Button
          onClick={handleCancel}
          className={commonStyles.buttonMarginRight}
        >
          {formatMessage({ id: 'button.cancel' })}
        </Button>
        <Button onClick={handleSave} loading={pending} type="primary">
          {formatMessage({ id: 'button.update' })}
        </Button>
      </div>
    </div>
  );
};

export default FormToolbar;
