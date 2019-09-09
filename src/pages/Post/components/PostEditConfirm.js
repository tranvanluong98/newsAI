import { Button, Modal, Typography, Icon, Input, Alert } from 'antd';
import React, { useState, useEffect, useCallback } from 'react';
import moment from 'moment';
import { router } from 'umi';
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

export const ConfirmContext = React.createContext();
const { confirm } = Modal;
// connect with Backend
const reset = async id => dataProvider(IGNORE_REPORT_POST, 'posts', { id });

const BasicForm = withSimpleForm({ name: 'contractBasic' });
const { Text } = Typography;
const PostEditForm = ({ basePath, resource, id, redirectOnSuccess }) => {
  const { isLoading, save, record } = useEditController({
    basePath,
    resource,
    id,
    redirect: redirectOnSuccess,
  });

  const [showReport, setShowReport] = useState(false);
  const [reason, setReasonReject] = useState('');
  const RejectPost = async (currentIdUpdate, onSuccess) => {
    const res = await dataProvider(UPDATE_POST, `posts`, {
      id: currentIdUpdate,
      reason,
      status: 2,
    });
    if (typeof onSuccess === 'function') {
      onSuccess(res);
    }
  };
  const ConfirmPost = async currentIdUpdate =>
    dataProvider(UPDATE_POST, `posts`, {
      id: currentIdUpdate,
      reason,
      status: 1,
    });
  const onClickConfirmReport = () => {
    confirm({
      title: 'Bạn chắc chắn muốn bỏ hết số report của bài viết này ?',
      onOk() {
        reset(id);
      },
    });
  };
  const onClickReject = () => {
    confirm({
      title: 'Bạn chắc chắn muốn từ chối bài viết này ?',
      onOk() {
        RejectPost(record.id);
      },
    });
  };
  const onClickConfirm = () => {
    confirm({
      title: 'Bạn đã chắc chắn muốn duyệt bài viết này ?',
      onOk() {
        ConfirmPost(record.id);
      },
    });
  };
  return (
    <BasicForm
      isLoading={isLoading}
      save={save}
      record={record}
      resource={resource}
      id={id}
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
          style={{ margin: '0px 15px 0 0' }}
          type="primary"
          onClick={() => onClickConfirmReport()}
        >
          Xóa Report
        </Button>
        <Button
          style={{ margin: '0px 25px 0 0' }}
          type="danger"
          onClick={() => setShowReport(!showReport)}
        >
          Xem Report
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
        disabled={record.status !== 0}
        placeholder="Chủ đề"
        name="categories"
        rules={[
          { required: true, message: 'Chủ đề bài viết không được để trống' },
        ]}
        configKey="category-create-post"
        normalizeOpt={val => ({ name: val.name, value: val.id })}
        mapRecordToInitial={cats => cats.map(cat => cat.id)}
      />
      <Input
        disabled
        name={postModel.title}
        rules={[
          { required: true, message: 'Tiêu đề bài viết không được để trống' },
        ]}
      />
      <Input
        disabled
        name={postModel.shortContent}
        rules={[
          { required: true, message: 'Nội dung bài viết không được để trống' },
        ]}
      />
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
      <Input
        disabled={![0, 1].includes(record.status)}
        name={postModel.reason}
        value={reason}
        onChange={e => setReasonReject(e.target.value)}
        rules={[
          {
            required: true,
            message: 'Lý do không được để trống',
          },
        ]}
      />
      <PendingToolbar />
    </BasicForm>
  );
};
// ...rest : get all props left
const PendingToolbar = ({ record, ...rest }) => {
  if (record.status === 0) {
    return (
      <>
        <ApprovalBtn {...rest} />
        <RejectBtn {...rest} />
      </>
    );
  }
  if (record.status === 1) {
    return <RejectBtn {...rest} />;
  }
  return null;
};

const ApprovalBtn = ({ save, getFieldValue, getFieldsValue, record }) => {
  const onClick = useCallback(() => {
    const currentValues = getFieldsValue();
    confirm({
      title: 'Bạn đã chắc chắn muốn duyệt bài viết này ?',
      onOk() {
        save({
          reason: currentValues.reason,
          categories: currentValues.categories,
          id: currentValues.id,
          status: 1,
        });
        router.replace('/posts');
      },
    });
  });
  return (
    <Button
      style={{
        margin: '0px 5px',
      }}
      type="primary"
      onClick={onClick}
    >
      Duyệt
    </Button>
  );
};

const RejectBtn = ({ save, getFieldValue, getFieldsValue, record }) => {
  const onClick = useCallback(() => {
    const currentValues = getFieldsValue();
    confirm({
      title: 'Bạn đã chắc chắn muốn từ chối bài viết này ?',
      onOk() {
        save({
          reason: currentValues.reason,
          categories: currentValues.categories,
          id: currentValues.id,
          status: 2,
        });
        alert('Từ Chối Thành Công');
      },
    });
  });
  return (
    <Button
      style={{
        margin: '0px 5px',
      }}
      type="danger"
      onClick={onClick}
    >
      Từ Chối
    </Button>
  );
};
export default PostEditForm;
