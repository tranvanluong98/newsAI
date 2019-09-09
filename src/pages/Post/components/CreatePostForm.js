import {
  Button,
  Upload,
  Icon,
  message,
  Select,
  Input,
  Dropdown,
  Menu,
  notification,
  Typography,
  Col,
} from 'antd';
import React, { useState, useEffect } from 'react';
import classnames from 'classnames';
import axios from 'axios';
import { router } from 'umi';
import commonStyle from '@/common.less';
import postModel from '@/dataModels/post';
import useCreateController from '@/core/controllers/useCreateController';
import withSimpleForm from '@/components/Form/SimpleForm';
import ConfigMultiSelect from '@/components/Input/ConfigMultiSelect';
import AsyncSelect from '@/components/Input/AsyncSelect';

const { Title } = Typography;
const { TextArea } = Input;
const { Option } = Select;
const BasicForm = withSimpleForm({ name: 'contractBasic' });
const openNotificationWithIcon = type => {
  if (type === 'success') {
    notification[type]({
      message: 'Thêm mới thành công!',
    });
  } else {
    notification[type]({
      message: 'Thêm mới thất bại!',
    });
  }
};
const Toolbar = val => (
  <div className={classnames(commonStyle.editFormToolbar, commonStyle.w100)}>
    <div />
    <Title level={2} type="secondary">
      Thêm Mới Bài Viết
    </Title>
    <div className={commonStyle.flex}>
      <Button
        style={{ marginLeft: 18 }}
        type="primary"
        htmlType="submit"
        notification={{
          onSuccess: {
            message: 'Tạo mới thành công',
          },
          onFailure: {
            message: 'Tạo mới thất bại',
          },
        }}
        // onClick={() => router.replace('/posts')}
      >
        <Icon type="check-circle" />
        Xong
      </Button>
      <Button
        style={{ position: 'relative', right: '-15px' }}
        onClick={() => router.replace('/posts')}
      >
        {' '}
        <Icon type="arrow-left" />
        Quay Lại
      </Button>
    </div>
  </div>
);

const PostCreateForm = ({ basePath, resource, id, redirectOnSuccess }) => {
  const { isLoading, save } = useCreateController({
    basePath,
    resource: 'posts',
    id,
    redirect: redirectOnSuccess,
  });
  const [displayType, setDisplayType] = useState(69);
  return (
    <BasicForm isLoading={isLoading} save={save} resource="posts">
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
      <Select
        onSelect={value => {
          setDisplayType(value);
        }}
        name={postModel.displayType}
        rules={[
          { required: true, message: 'Loại bài viết không được để trống' },
        ]}
        value={displayType}
        placeholder="Bạn hãy chọn loại bài viết"
        style={{ marginRight: 21, flexBasis: '366px' }}
      >
        <Option value={1}> Tin tức mạng xã hội</Option>
        <Option value={0}> Tin tức báo chí</Option>
      </Select>
      <Input
        placeholder="Tiêu đề bài viết"
        name={postModel.title}
        rules={[{ required: true, message: 'Tên tiêu đề không được để trống' }]}
      />
      ),
      {displayType === 0 ? (
        <ImageFeatureNews name="featureImages" />
      ) : (
        <ImageFeatureSocial name="featureImages" />
      )}
      {displayType === 1 ? (
        <ContentSocial name="content" />
      ) : (
        <ContentNews name="content" />
      )}
    </BasicForm>
  );
};

const UploadImageSingle = ({ ...props }) => {
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
      message.error('Bạn có thể tải lên định dạng JPG/PNG!');
    }
    const isLt12M = file.size / 1024 / 1024 < 12;
    if (!isLt12M) {
      message.error('Kích thước ảnh phải nhỏ hơn 12MB!');
    }
    return isJpgOrPng && isLt12M;
  }
  const uploadButton = (
    <div>
      <div className="ant-upload-text">Tải Ảnh Lên</div>
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
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        beforeUpload={beforeUpload}
        onChange={handleChange}
        {...props}
      >
        {imageUrl ? (
          <img src={imageUrl} alt="avatar" style={{ width: '100%' }} />
        ) : (
          uploadButton
        )}
      </Upload>
    </div>
  );
};

const ContentSocial = ({ onChange }) => (
  <div>
    <TextArea
      allowClear
      placeholder="Nội dung bài viết"
      name={postModel.content}
      onChange={onChange}
      autosize={{ minRows: 2, maxRows: 6 }}
      rules={[{ required: true, message: 'Nội dung không được để trống' }]}
    />
  </div>
);
const ContentNews = ({ onChange }) => {
  const [content, setContent] = useState([]);
  const handleMenuClickText = () => {
    const newContent = [...content, { type: 'text', content: '' }];
    setContent(newContent);
  };
  const handleMenuClickImage = () => {
    const newContent = [...content, { type: 'image', link: '' }];
    setContent(newContent);
  };
  const menu = (
    <Menu>
      <Menu.Item key="1" onClick={handleMenuClickText} allowClear>
        <Icon type="file" />
        Thêm văn bản
      </Menu.Item>
      <Menu.Item key="2" onClick={handleMenuClickImage}>
        <Icon type="file-image" />
        Thêm ảnh
      </Menu.Item>
    </Menu>
  );

  return (
    <div>
      {content.map(({ type, content: contentText, link }, i) => {
        const DeleteElementArray = () => {
          const newArrayContent = [
            ...content.slice(0, i),
            ...content.slice(i + 1),
          ];
          setContent(newArrayContent);
          onChange(newArrayContent);
        };
        if (type === 'text') {
          return (
            <div>
              <TextArea
                style={{ width: '97%', display: 'inline-block' }}
                value={contentText}
                onChange={e => {
                  const newContent = [...content];
                  newContent[i].content = e.target.value;
                  setContent(newContent);
                  onChange(newContent);
                }}
                placeholder="Nội dung bài viết"
                autosize={{ minRows: 2, maxRows: 6 }}
              />
              <Icon type="close" onClick={DeleteElementArray} />
            </div>
          );
        }
        if (type === 'image') {
          if (link === '') {
            return (
              <div>
                <div style={{ position: 'relative', display: 'inline-block' }}>
                  <UploadImageSingle
                    style={{ width: '97%', display: 'inline-block' }}
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    customRequest={async ({ action, file }) => {
                      const data = new FormData();
                      data.append('file', file);
                      const res = await axios.post(action, data, {});
                      const newContent = [...content];
                      newContent[i].link = res.data.url;
                      setContent(newContent);
                      onChange(newContent);
                    }}
                  />
                  <Icon
                    style={{ position: 'absolute', top: '0' }}
                    type="close"
                    onClick={DeleteElementArray}
                  />
                </div>
              </div>
            );
          }

          return (
            <div>
              <img
                src={link}
                style={{
                  maxWidth: '500px',
                  marginLeft: '25%',
                  maxHeight: '500px',
                }}
                alt={link}
                title="hình ảnh"
              />
              <Icon
                // style={{ position: 'relative', top: '-55px', right: '-5px' }}
                type="close"
                onClick={DeleteElementArray}
              />
            </div>
          );
        }
        return null;
      })}
      <Dropdown overlay={menu}>
        <Button>
          Chọn kiểu thêm <Icon type="down" />
        </Button>
      </Dropdown>
    </div>
  );
};

const ImageFeatureNews = ({ onChange }) => {
  const [featureImages, setFeatureImages] = useState([]);

  return (
    <Upload
      multiple={false}
      showUploadList={false}
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      customRequest={async ({ action, file }) => {
        const data = new FormData();
        data.append('file', file);
        const res = await axios.post(action, data, {});
        const newFeatureImages = [
          {
            small: res.data.url,
            large: res.data.url,
          },
        ];
        setFeatureImages(newFeatureImages);
        onChange(newFeatureImages);
      }}
    >
      {featureImages.length ? (
        <img
          src={featureImages[0].large}
          alt="avatar"
          style={{ maxHeight: '200px' }}
        />
      ) : (
        <Button type="primary">Tải Lên</Button>
      )}
    </Upload>
  );
};

const ImageFeatureSocial = ({ onChange, ...props }) => {
  const [fileList, setFileList] = useState(
    props.value
      ? props.value.map(image => ({
          uid: Math.random(),
          name: 'image.png',
          status: 'done',
          url: image.large,
        }))
      : [],
  );
  useEffect(() => {
    setFileList(
      props.value
        ? props.value.map(image => ({
            uid: Math.random(),
            name: 'image.png',
            status: 'done',
            url: image.large,
            large: image.large,
            small: image.small,
          }))
        : [],
    );
  }, [props.value]);
  (fileList || []).map(({ content }, i) => {
    const DeleteImage = () => {
      const newArrayContent = [...content.slice(0, i), ...content.slice(i + 1)];
      setFileList(newArrayContent);
    };
    return <Icon type="close" onClick={DeleteImage} />;
  });

  return (
    <div className="clearfix">
      <Upload
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        listType="picture-card"
        fileList={fileList}
        onChange={({ fileList: fl }) => {
          setFileList(fl);
        }}
        customRequest={async ({ action, file }) => {
          const data = new FormData();
          data.append('file', file);
          const res = await axios.post(action, data, {});
          const newFeatureImages = fileList.map(fl => ({
            large: fl.large,
            small: fl.small,
          }));
          newFeatureImages.push({
            small: res.data.url,
            large: res.data.url,
          });
          const newFileList = [...fileList];
          newFileList.push({
            uid: Math.random(),
            name: 'image.png',
            status: 'done',
            url: res.data.url,
          });
          setFileList(newFileList);
          // onChange(newFileList);
        }}
      >
        <Icon type="plus" />
        <div className="ant-upload-text"> Tải lên</div>
      </Upload>
    </div>
  );
};
export default PostCreateForm;
