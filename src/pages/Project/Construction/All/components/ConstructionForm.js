import {
  Button,
  DatePicker,
  Dropdown,
  Icon,
  Input,
  Menu,
  Checkbox,
} from 'antd';
import { formatMessage } from 'umi-plugin-locale';
import React, { useCallback } from 'react';
import classnames from 'classnames';
import moment from 'moment';

import Resource from '@/core/Resource';
import SelectInput from '@/components/Input/SelectInput';
import StandardFileInput from '@/components/Input/StandardFileInput';
import commonStyle from '@/common.less';
import useEditController from '@/core/controllers/useEditController';
import withSimpleForm from '@/components/Form/SimpleForm';
import constructionModel from '@/dataModels/construction';
import ListController from '@/core/controllers/ListController';

const BasicForm = withSimpleForm({ name: 'constructionBasic' });

const toolMenu = (
  <Menu>
    <Menu.Item>{formatMessage({ id: 'Xuất hợp đồng ra Word' })}</Menu.Item>
    <Menu.Item>{formatMessage({ id: 'Chọn mẫu hợp đồng' })}</Menu.Item>
    <Menu.Item>{formatMessage({ id: 'Thêm phụ lục hợp đồng' })}</Menu.Item>
  </Menu>
);

const Toolbar = ({ pending }) => (
  <div className={classnames(commonStyle.editFormToolbar, commonStyle.w100)}>
    <div />
    <div className={commonStyle.flex}>
      <Dropdown overlay={toolMenu}>
        <div className={commonStyle.flexAlignItemCenter}>
          {formatMessage({ id: 'Cộng cụ' })} <Icon type="down" />
        </div>
      </Dropdown>
      <Button
        style={{ marginLeft: 18 }}
        type="primary"
        htmlType="submit"
        loading={pending}
      >
        {formatMessage({ id: 'Cập nhật' })}
      </Button>
    </div>
  </div>
);

const ConstructionForm = ({ basePath, resource, id, redirectOnSuccess }) => {
  const { isLoading, save, record } = useEditController({
    basePath,
    resource,
    id,
    redirect: redirectOnSuccess,
  });
  const getPermanentFilter = useCallback(
    r => ({
      contractId: r.id,
    }),
    [],
  );
  return (
    <Resource resource="construction" hasList hasEdit hasCreate hasShow>
      <ListController resource="construction">
        <BasicForm
          isLoading={isLoading}
          save={save}
          record={record}
          resource={resource}
        >
          <Toolbar />
          {/* <div className={commonStyle.constructionDrawer}>
        <div className={commonStyle.leftConstructionDrawer}>{record.realEditDate}</div>
        <div className={commonStyle.rightConstructionDrawer}> */}
          <Input
            name={constructionModel.catalogJob}
            rules={[
              { required: true, message: 'Số hợp đồng không được để trống' },
            ]}
          />
          <SelectInput
            name={constructionModel.group}
            mapRecordToInitial={val => val && val.name}
            options={[
              {
                name: 'Xây thô',
                value: 'xây thô',
              },
              {
                name: 'Hoàn thiện',
                value: 'hoàn thiện',
              },
              {
                name: 'Cốp pha',
                value: 'cốp pha',
              },
            ]}
          />
          <SelectInput
            name={constructionModel.package}
            mapRecordToInitial={val => val && val.name}
            options={[
              {
                name: 'Xây thô',
                value: 'xây thô',
              },
              {
                name: 'Lắp nội thất',
                value: 'lắp nội thất',
              },
              {
                name: 'Trồng cây xanh',
                value: 'trông cây xanh',
              },
              {
                name: 'Gói thầu thi công phần thân thô',
                value: 'gói thầu thi công phần thân thô',
              },
            ]}
          />
          <DatePicker
            className={commonStyle.w100}
            mapRecordToInitial={val => (val && moment(val)) || null}
            name={constructionModel.realStartDate}
            rules={[
              {
                required: true,
                message: 'Ngày ký hợp đồng không được để trống',
              },
            ]}
            normalize={val => (val && moment(val)) || null}
          />
          <DatePicker
            className={commonStyle.w100}
            mapRecordToInitial={val => (val && moment(val)) || null}
            name={constructionModel.expectFinishDate}
            rules={[
              {
                required: true,
                message: 'Ngày ký hợp đồng không được để trống',
              },
            ]}
            normalize={val => (val && moment(val)) || null}
          />
          <SelectInput
            name={constructionModel.constructionState}
            mapRecordToInitial={val => val && val.name}
            options={[
              {
                value: 'có nhà thầu',
                name: 'Có nhà thầu',
              },
              {
                value: 'chưa có nhà thầu',
                name: 'Chưa có nhà thầu',
              },
              {
                value: 'dừng',
                name: 'Dừng',
              },
              {
                value: 'đang thực hiện',
                name: 'Đang thực hiện',
              },
            ]}
          />
          <div className={commonStyle.title}>Kế hoạch</div>
          <Button className={commonStyle.btnFormConstruction} block>
            Thêm bộ phận duyệt kế hoạch
          </Button>
          {/* <Input
        name={constructionModel.requestment}
        rules={[{ required: true, message: 'Tên hợp đồng không được để trống' }]}
      /> */}
          {/* <SelectInput
          name={constructionModel.requestmentUnit}
          mapRecordToInitial={val => val && val.id}
          options={[
            {
              name: 'Ban vật tư',
              value: '1',
            },
            {
              name: 'Ban vật liệu',
              value: '2',
            },
            {
              name: 'Ban phát triển',
              value: '3',
            },
          ]}
        />
        <Resource hasList hasCreate resource="file/contractFileAttach">
          <StandardFileInput
            resource="file/contractFileAttach"
            getPermanentFilter={getPermanentFilter}
            label={formatMessage({
              id: 'form.label.attachFile',
            })}
          />
        </Resource> */}
          {/* <DatePicker
          className={commonStyle.w100}
          mapRecordToInitial={val => (val && moment(val)) || null}
          name={contractModel.signingDate}
          rules={[{ required: true, message: 'Ngày ký hợp đồng không được để trống' }]}
          normalize={val => (val && moment(val)) || null}
        />
        <DatePicker
          className={commonStyle.w100}
          mapRecordToInitial={val => (val && moment(val)) || null}
          name={contractModel.implementDate}
          rules={[{ required: true, message: 'Ngày thực hiện hợp đồng không được để trống' }]}
          normalize={val => (val && moment(val)) || null}
        />
        <DatePicker
          className={commonStyle.w100}
          mapRecordToInitial={val => (val && moment(val)) || null}
          name={contractModel.expectFinishDate}
          rules={[{ required: true, message: 'Ngày thực hiện hợp đồng không được để trống' }]}
          normalize={val => (val && moment(val)) || null}
        />
        <DatePicker
          className={commonStyle.w100}
          mapRecordToInitial={val => (val && moment(val)) || null}
          name={contractModel.takeOverDate}
          rules={[{ required: true, message: 'Ngày nghiệm thu không được để trống' }]}
          normalize={val => moment(val)}
        />
        <DatePicker
          className={commonStyle.w100}
          mapRecordToInitial={val => (val && moment(val)) || null}
          name={contractModel.liquidateDate}
          rules={[{ required: true, message: 'Ngày thanh lý không được để trống' }]}
          normalize={val => (val && moment(val)) || null}
        />
        <DatePicker
          className={commonStyle.w100}
          mapRecordToInitial={val => (val && moment(val)) || null}
          name={contractModel.realStartDate}
          normalize={val => (val && moment(val)) || null}
        />
        <DatePicker
          className={commonStyle.w100}
          mapRecordToInitial={val => (val && moment(val)) || null}
          name={contractModel.realFinishDate}
          normalize={val => (val && moment(val)) || null}
        />
        <Input
          name={contractModel.contractValue}
          rules={[{ required: true, message: 'Giá trị hợp đồng không được để trống' }]}
        />
        <SelectInput
          name={contractModel.package}
          mapRecordToInitial={val => val && val.id}
          options={[
            {
              name: 'Xây thô',
              value: 'rawBulding',
            },
            {
              name: 'Sơn bả',
              value: 'painting',
            },
          ]}
        />
        <Resource hasList hasCreate resource="file/contractFileAttach">
          <StandardFileInput
            resource="file/contractFileAttach"
            getPermanentFilter={getPermanentFilter}
            label={formatMessage({
              id: 'form.label.attachFile',
            })}
          />
        </Resource>
        <Resource hasList hasCreate resource="file/contractDocAttach">
          <StandardFileInput
            resource="file/contractDocAttach"
            getPermanentFilter={getPermanentFilter}
            label={formatMessage({
              id: 'form.label.attachDoc',
            })}
          />
        </Resource> */}
          {/* </div>
      </div> */}
        </BasicForm>
      </ListController>
    </Resource>
  );
};

export default ConstructionForm;
