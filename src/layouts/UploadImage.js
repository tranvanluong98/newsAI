import { Button, Input, Upload, Icon, message } from 'antd';
import React, { useState } from 'react';
import classnames from 'classnames';
import axios from 'axios';
import commonStyle from '@/common.less';
import postModel from '@/dataModels/post';
import useCreateController from '@/core/controllers/useCreateController';
import withSimpleForm from '@/components/Form/SimpleForm';
import ConfigMultiSelect from '@/components/Input/ConfigMultiSelect';
import AsyncSelect from '@/components/Input/AsyncSelect';
import SelectInput from '@/components/Input/SelectInput';

const BasicForm = withSimpleForm({ name: 'contractBasic' });

const UploadImageSingle = ({ basePath, resource, id, redirectOnSuccess }) => {
  const { isLoading, save, record = {} } = useCreateController({
    basePath,
    resource,
    id,
    redirect: redirectOnSuccess,
  });

  return (
    <BasicForm
      isLoading={isLoading}
      save={save}
      record={record}
      resource={resource}
    >
      <UploadImage />
    </BasicForm>
  );
};

const UploadImage = ({ save, getFieldValue, getFieldsValue, record }) => {
  const [imageUrl, setImageUrl] = useState();
  const [loading, setLoading] = useState(false);

  function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  }
  const uploadButton = (
    <div>
      <div className="ant-upload-text">Upload</div>
    </div>
  );

  const handleChange = info => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imgUrl => {
        setLoading(false);
        setImageUrl(imgUrl);
      });
    }
  };
  return (
    <div>
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        beforeUpload={beforeUpload}
        onChange={handleChange}
      >
        {imageUrl ? (
          <img src={imageUrl} alt="avatar" style={{ width: '100%' }} />
        ) : (
          uploadButton
        )}
      </Upload>
      <br />
      <br />
    </div>
  );
};
export default UploadImageSingle;
