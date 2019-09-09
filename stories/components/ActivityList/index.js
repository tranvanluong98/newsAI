import React from 'react';
import { Table } from 'antd';
import { formatMessage } from 'umi-plugin-locale';

const columns = [
  {
    title: (
      <>
        <div>
          {formatMessage({
            id: 'tables.activityList.columnHeaders.contractName',
          })}
        </div>
        <div>
          {formatMessage({
            id: 'tables.activityList.columnHeaders.contractNum',
          })}
        </div>
      </>
    ),
    render: record => (
      <span>
        <div>{record.contractName}</div>
        <div>{record.contractNum}</div>
      </span>
    ),
  },
  {
    title: (
      <>
        <div>
          {formatMessage({
            id: 'tables.activityList.columnHeaders.contractValue',
          })}
        </div>
        <div>
          {formatMessage({ id: 'tables.activityList.columnHeaders.abated' })}
        </div>
      </>
    ),
    render: record => (
      <span>
        <div>{record.contractValue}</div>
        <div>{record.abated}</div>
      </span>
    ),
  },
  {
    title: (
      <>
        <div>
          {formatMessage({ id: 'tables.activityList.columnHeaders.awating' })}
        </div>
        <div>
          {formatMessage({
            id: 'tables.activityList.columnHeaders.proposedDate',
          })}
        </div>
      </>
    ),
    render: record => (
      <span>
        <div>{record.awating}</div>
        <div>{record.proposedDate}</div>
      </span>
    ),
  },
];

const data = [
  {
    id: '1',
    contractName: 'Xây thô tòa nhà S1',
    contractNum: 'HD/1100/HH001',
    contractValue: '100,000,000',
    abated: '9,000,000',
    awating: '19,000,000,000',
    proposedDate: '10/10/2019',
  },
  {
    id: '2',
    contractName: 'Xây thô tòa nhà S1',
    contractNum: 'HD/1100/HH001',
    contractValue: '100,000,000',
    abated: '9,000,000',
    awating: '19,000,000,000',
    proposedDate: '10/10/2019',
  },
  {
    id: '3',
    contractName: 'Xây thô tòa nhà S1',
    contractNum: 'HD/1100/HH001',
    contractValue: '100,000,000',
    abated: '9,000,000',
    awating: '19,000,000,000',
    proposedDate: '10/10/2019',
  },
];

const TableActivityList = () => (
  <div>
    <Table columns={columns} dataSource={data} />
  </div>
);

export default TableActivityList;
