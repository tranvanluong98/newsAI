import { Button, Input, Upload, Icon } from 'antd';
import React from 'react';
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

const Toolbar = ({ pending }) => (
  <div className={classnames(commonStyle.editFormToolbar, commonStyle.w100)}>
    <div />
    <div className={commonStyle.flex}>
      <Button
        style={{ marginLeft: 18 }}
        type="primary"
        htmlType="submit"
        loading={pending}
      >
        Thêm Mới
      </Button>
    </div>
  </div>
);

const ContractCreateForm = ({ basePath, resource, id, redirectOnSuccess }) => {
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
      <Toolbar />
      <AsyncSelect
        name="authorId"
        configKey="users/user-create-post"
        optPath="data"
        allowClear
        placeholder="Lọc Theo Kí Giả"
        showSearch
        rules={[{ required: true, message: 'Ký giả không được để trống' }]}
      />
      <ConfigMultiSelect
        placeholder="Chủ đề"
        name="categories"
        rules={[
          { required: true, message: 'Chủ đề bài viết không được để trống' },
        ]}
        configKey="category-create-post"
        normalizeOpt={val => ({ name: val.name, value: val.id })}
      />
      <Input
        placeholder="Tiêu đề bài viết"
        name={postModel.title}
        rules={[{ required: true, message: 'Tên tiêu đề không được để trống' }]}
      />
      <Input
        placeholder="Nội dung bài viết"
        name={postModel.content}
        rules={[{ required: true, message: 'Nội dung không được để trống' }]}
      />
      <SelectInput
        placeholder="Chọn loại bài viết"
        name={postModel.displayType}
        rules={[
          { required: true, message: 'Loại bài viết không được để trống' },
        ]}
        options={[
          {
            name: 'Tin tức mạng xã hội',
            value: 1,
          },
          {
            name: 'Tin tức báo chí',
            value: 0,
          },
        ]}
      />
      <UploadImage />
    </BasicForm>
  );
};
const fileList = [];
const data = new FormData();
const props = {
  // action: send to backend through API
  action: () =>
    axios
      .post('https://www.mocky.io/v2/5cc8019d300000980a055e76', data, {})
      .then(res => {
        // then print response status
        console.log('res', res.data);
      }),
  data: dataImage => console.log('data', dataImage.name),
  listType: 'picture',
  defaultFileList: [...fileList],
};

const UploadImage = ({ save, getFieldValue, getFieldsValue, record }) => (
  <div>
    <Upload {...props}>
      <Button>
        <Icon type="upload" /> Tải ảnh lên
      </Button>
    </Upload>
    <br />
    <br />
  </div>
);
export default ContractCreateForm;
