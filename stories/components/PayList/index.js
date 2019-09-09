import React from 'react';
import { Table } from 'antd';
import styles from './index.less';

const columns = [
  {
    title: 'Nội dung',
    render: record => (
      <span>
        <div>{record.content}</div>
      </span>
    ),
  },
  {
    title: 'Ngày thanh toán',
    render: record => (
      <span>
        <div>{record.dateOfPayment}</div>
      </span>
    ),
  },
  {
    title: 'Số tiền',
    render: record => (
      <span>
        <div>{record.totalMoney}</div>
      </span>
    ),
  },
];

const data = [
  {
    id: '1',
    content: 'Tạm ứng lần 1',
    dateOfPayment: '12/03/2019',
    totalMoney: '120,782,241,000',
  },
  {
    id: '2',
    content: 'Tạm ứng lần 2',
    dateOfPayment: '17/03/2019',
    totalMoney: '10,000,000',
  },
  {
    id: '3',
    content: 'Quyết toán lần 1',
    dateOfPayment: '17/03/2019',
    totalMoney: '12,300,000',
  },
];

const TablePayList = () => (
  <div className={styles.TablePayList}>
    <Table columns={columns} dataSource={data} />
  </div>
);

export default TablePayList;
