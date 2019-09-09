import { Icon } from 'antd';
import { formatMessage } from 'umi-plugin-locale';
import { useDispatch } from 'react-redux';
import { useDropzone } from 'react-dropzone';
import React, { useCallback, useMemo, useState } from 'react';
import classnames from 'classnames';

import { refreshViewResource } from '@/core/actions/resourceActions';
import AntLabel from '@/components/Form/AntLabel';
import DataList from '@/components/DataList';
import FileDisplay from '@/components/Fields/FileDisplay';
import FileLoader from '@/components/Loader/FileLoader';
import ListController from '@/core/controllers/ListController';
import commonStyles from '@/common.less';

import styles from './index.less';

const StandardFileInput = ({
  record,
  resource = '',
  getPermanentFilter,
  resourceState,
}) => {
  const Context = useMemo(() => React.createContext(), []);
  const dispatch = useDispatch();
  const [uploadList, updateUploadList] = useState([]);
  const onDrop = useCallback(
    acceptedFiles => {
      updateUploadList([...uploadList, ...acceptedFiles]);
    },
    [updateUploadList, uploadList],
  );
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const listOptions = useMemo(
    () => ({
      renderItem: item => <FileDisplay data={item} />,
    }),
    [],
  );

  const permanentFilter = useMemo(() => getPermanentFilter(record), [
    getPermanentFilter,
    record,
  ]);

  if (!resourceState) {
    return null;
  }

  return (
    <>
      <AntLabel
        label={formatMessage({
          id: 'form.label.attachFile',
        })}
      />
      <div className={commonStyles.flexColumn}>
        <ListController
          resource={resource}
          permanentFilter={permanentFilter}
          noRouteOnParamsChange
          perPage={3}
          Context={Context}
        >
          <DataList listOptions={listOptions} Context={Context} />
        </ListController>
        {uploadList.map(item => (
          <FileLoader
            key={item.name}
            file={item}
            resource={resource}
            onSuccess={() => dispatch(refreshViewResource(resource))}
          />
        ))}
        <div
          {...getRootProps({
            className: classnames(
              commonStyles.pointerCursor,
              styles.dragArea,
              commonStyles.flex,
              commonStyles.flexAlignItemCenter,
              commonStyles.flexJustifyCenter,
            ),
          })}
          style={{ marginTop: 8 }}
        >
          <input {...getInputProps()} />
          <Icon type="plus" />
          {formatMessage({
            id: 'button.attachFileAdd',
          })}
        </div>
      </div>
    </>
  );
};

export default StandardFileInput;
