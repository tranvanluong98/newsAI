import {
  Button,
  Modal,
  Typography,
  Icon,
  Input,
  Upload,
  message,
  notification,
  Menu,
  Dropdown,
  Select,
} from 'antd';
import React, { useState, useEffect, useCallback } from 'react';
import moment from 'moment';
import { router } from 'umi';
import get from 'lodash/get';
import axios from 'axios';
import Datagrid from '@/containers/List/components/Datagrid';
import ListController from '@/core/controllers/ListController';
import postModel from '@/dataModels/post';
import useEditController from '@/core/controllers/useEditController';
import withSimpleForm from '@/components/Form/SimpleForm';
import ConfigMultiSelect from '@/components/Input/ConfigMultiSelect';
import dataProvider, {
  IGNORE_REPORT_POST,
  UPDATE_POST,
} from '@/services/dataProvider';
import { PostContext } from '..';

export const ConfirmContext = React.createContext();
const { confirm } = Modal;
const { Option } = Select;
// connect with Backend
const reset = async id => dataProvider(IGNORE_REPORT_POST, 'posts', { id });

const BasicForm = withSimpleForm({ name: 'contractBasic' });
const { Text } = Typography;
const { TextArea } = Input;
const EditPostDetailWithLs = props => {
  const { match } = props;
  return (
    <ListController resource="posts" perPage={10} Context={PostContext}>
      <EditPostDetail {...props} id={get(match, 'params.id')} />
    </ListController>
  );
};

const EditPostDetail = ({ basePath, resource, id, redirectOnSuccess }) => {
  const { isLoading, save, record: recordtemp } = useEditController({
    basePath,
    resource: 'posts',
    id,
    redirect: redirectOnSuccess,
  });
  const record = recordtemp || {};
  const [showReport, setShowReport] = useState(false);
  const [reason, setReason] = useState('');
  const [title, setTitle] = useState(`${record.title}`);
  const onClickConfirmReport = () => {
    confirm({
      title: 'Bạn chắc chắn muốn bỏ hết số report của bài viết này ?',
      onOk() {
        reset(id);
      },
    });
  };

  const imageFeature =
    record.displayType === 0 ? (
      <ImageFeatureNews name="featureImages" />
    ) : (
      <ImageFeatureSocial name="featureImages" />
    );

  const content =
    record.displayType === 1 ? (
      <ContentSocial name="content" />
    ) : (
      <ContentNews name="content" />
    );
  return (
    <BasicForm
      isLoading={isLoading}
      save={save}
      record={record}
      resource="posts"
      id={id}
      notification={{
        onSuccess: {
          message: 'Cập nhật thành công',
        },
        onFailure: {
          message: 'Cập nhật thất bại',
        },
      }}
    >
      {showReport && (
        <div>
          <Text strong>Danh sách report</Text>
          <br /> <br />
          <ListController
            resource={`posts/report/${record.id}`}
            Context={ConfirmContext}
          >
            <Datagrid
              Context={ConfirmContext}
              columns={[
                {
                  title: 'Lý Do',
                  key: 'reason',
                  dataIndex: 'reason',
                },
                {
                  title: 'Số Lượng',
                  key: 'count',
                  dataIndex: 'count',
                },
              ]}
            />
          </ListController>
        </div>
      )}

      <span>
        <b>Số lượt report : </b> {record.reportNumber} <br />
        <b> Trạng Thái :</b>{' '}
        {{ '0': 'Chờ duyệt', '1': 'Duyệt', '2': 'Từ chối' }[record.status]}
      </span>
      <div
        style={{
          marginTop: '-35px',
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      >
        <Button
          style={{ margin: '0px 10px 0 0' }}
          type="primary"
          onClick={() => onClickConfirmReport()}
        >
          <Icon type="delete" />
          Xóa Report
        </Button>
        <Button
          // style={{ margin: '0px 25px 0 0' }}
          type="danger"
          onClick={() => setShowReport(!showReport)}
        >
          <Icon type="eye" />
          Xem Report
        </Button>
        <Button
          style={{ margin: '0 10px 0 10px' }}
          type="primary"
          htmlType="submit"
        >
          <Icon type="check-circle" />
          Cập Nhật
        </Button>
        <Button
          onClick={() => {
            router.replace('/posts');
          }}
        >
          <Icon type="arrow-left" />
          Quay Lại
        </Button>
      </div>

      <Input
        disabled
        name="author.fullName"
        rules={[
          { required: true, message: 'Tên người dùng không được để trống' },
        ]}
      />
      <ConfigMultiSelect
        // disabled={record.status !== 0}
        placeholder="Chủ đề"
        name="categories"
        rules={[
          { required: true, message: 'Chủ đề bài viết không được để trống' },
        ]}
        configKey="category-create-post"
        normalizeOpt={val => ({ name: val.name, value: val.id })}
        mapRecordToInitial={cats => (cats || []).map(cat => cat.id)}
      />
      <Input
        name={postModel.title}
        value={title}
        onChange={e => setTitle(e.target.value)}
        rules={[
          { required: true, message: 'Tiêu đề bài viết không được để trống' },
        ]}
      />

      <Input
        placeholder="Bạn hãy điền lý do hoặc để"
        name={postModel.reason}
        value={reason}
        onChange={e => setReason(e.target.value)}
      />

      <Select defaultValue={1} style={{ width: 120 }} name="status">
        <Option value={1}>Duyệt</Option>
        <Option value={2}>Từ Chối</Option>
        <Option value={0}>Chờ Duyệt</Option>
      </Select>
      {content}

      {imageFeature}

      <Text strong>Lịch sử bài viết</Text>
      <ListController
        resource={`posts/history/${record.id}`}
        perPage={5}
        Context={ConfirmContext}
      >
        <br />
        <Datagrid
          Context={ConfirmContext}
          columns={[
            {
              title: 'Thời Gian Duyệt',
              key: 'createdAt',
              dataIndex: 'createdAt',
              render: value => moment(value).format('lll'),
            },
            {
              title: 'Trạng Thái',
              key: 'type',
              dataIndex: 'type',
              render: value => (value === 1 ? 'Duyệt' : 'Từ Chối'),
            },
            {
              title: 'Lý Do',
              key: 'reason',
              dataIndex: 'reason',
            },
          ]}
        />
      </ListController>
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
const ContentSocial = ({ onChange, ...props }) => (
  <TextArea
    allowClear
    placeholder="Nội dung bài viết"
    autosize={{ minRows: 2, maxRows: 6 }}
    rules={[{ required: true, message: 'Nội dung không được để trống' }]}
    {...props}
    onChange={onChange}
  />
);

const ContentNews = ({ onChange, ...props }) => {
  const [contentNews, setContentNews] = useState(props.value || []);
  useEffect(() => {
    setContentNews(props.value || []);
  }, [props.value]);
  const DeleteElementArray = i => () => {
    const newArrayContent = [
      ...contentNews.slice(0, i),
      ...contentNews.slice(i + 1),
    ];
    setContentNews(newArrayContent);
    onChange(newArrayContent);
  };
  const handleMenuClickText = () => {
    const newContent = [...contentNews, { type: 'text', content: '' }];
    setContentNews(newContent);
  };
  const handleMenuClickImage = () => {
    const newContent = [...contentNews, { type: 'image', link: '' }];
    setContentNews(newContent);
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
  console.log('contentNews ', contentNews);
  return (
    <div>
      {contentNews.map(({ type, content, link }, i) => {
        if (type === 'text') {
          return (
            <div>
              <TextArea
                style={{ width: '97%', display: 'inline-block' }}
                value={content}
                onChange={e => {
                  const newContent = [...contentNews];
                  newContent[i].content = e.target.value;
                  setContentNews(newContent);
                  onChange(newContent);
                }}
                placeholder="Nội dung bài viết"
                autosize={{ minRows: 2, maxRows: 6 }}
              />
              <Icon type="close" onClick={DeleteElementArray(i)} />
            </div>
          );
        }
        if (type === 'image') {
          if (link === '') {
            return (
              <div>
                <div style={{ position: 'relative', display: 'inline-block' }}>
                  <UploadImageSingle
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    customRequest={async ({ action, file }) => {
                      const data = new FormData();
                      data.append('file', file);
                      const res = await axios.post(action, data, {});
                      const newContent = [...contentNews];
                      newContent[i].link = res.data.url;
                      setContentNews(newContent);
                      onChange(newContent);
                    }}
                  />
                  <Icon
                    type="close"
                    style={{ position: 'absolute', top: '0' }}
                    onClick={DeleteElementArray(i)}
                  />
                </div>
              </div>
            );
          }
          return (
            <div>
              <div>
                <img
                  src={link}
                  style={{
                    maxWidth: '500px',
                    marginLeft: '25%',
                    maxHeight: '500px',
                    position: 'relative',
                    display: 'inline-block',
                  }}
                  alt={link}
                  title="hình ảnh"
                />
                <Icon
                  style={{ position: 'absolute' }}
                  type="close"
                  onClick={DeleteElementArray(i)}
                />
              </div>
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
const ImageFeatureNews = ({ onChange, ...props }) => {
  const [featureImages, setFeatureImages] = useState(props.value || []);

  console.log('featureImages ', featureImages);
  useEffect(() => {
    setFeatureImages(props.value || []);
  }, [props.value]);
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
      {featureImages.length > 0 ? (
        <img
          src={featureImages[0].large}
          alt="avatar"
          style={{ maxHeight: '200px' }}
        />
      ) : (
        <Button type="primary">
          {' '}
          <Icon type="upload" />
          Tải Lên
        </Button>
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
          onChange(fl.map(f => ({ large: f.large, small: f.small })));
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
          onChange(newFeatureImages);
        }}
      >
        <Icon type="plus" />
        <div className="ant-upload-text"> Tải lên</div>
      </Upload>
    </div>
  );
};

export default EditPostDetailWithLs;
