import { Table } from 'antd';
import React from 'react';
import { formatMessage } from 'umi-plugin-locale';
import styles from './index.less';

const columns = [
  {
    title: (
      <div>
        {formatMessage({ id: 'tables.weightList.columnHeaders.jobName' })}
      </div>
    ),
    render: record => (
      <span>
        <div>{record.content}</div>
      </span>
    ),
  },
  {
    title: (
      <div>{formatMessage({ id: 'tables.weightList.columnHeaders.unit' })}</div>
    ),
    render: record => (
      <span>
        <div>{record.calUnit}</div>
      </span>
    ),
  },
  {
    title: (
      <>
        <div>
          {formatMessage({ id: 'tables.weightList.columnHeaders.weight' })}
        </div>
        <div>
          {formatMessage({ id: 'tables.weightList.columnHeaders.unitPrice' })}
        </div>
        <div>
          {formatMessage({
            id: 'tables.weightList.columnHeaders.totalRawPrice',
          })}
        </div>
      </>
    ),
    render: (text, record) => (
      <span>
        <div>{record.weight}</div>
        <div>{record.unitPrice}</div>
        <div>{record.totalRawPrice}</div>
      </span>
    ),
  },
];

const data = [
  {
    id: '1',
    content: 'Trát tường trong, dày 1,5 cm, vữa XM mác 50',
    calUnit: 'm3',
    weight: '77,841.53',
    unitPrice: '128,320',
    totalRawPrice: '9,988,625,130',
  },
  {
    id: '2',
    content: 'Trát tường trong, dày 1,5 cm, vữa XM mác 50',
    calUnit: 'm3',
    weight: '77,841.53',
    unitPrice: '128,320',
    totalRawPrice: '9,988,625,130',
  },
  {
    id: '3',
    content: 'Trát tường trong, dày 1,5 cm, vữa XM mác 50',
    calUnit: 'm3',
    weight: '77,841.53',
    unitPrice: '128,320',
    totalRawPrice: '9,988,625,130',
  },
];

const TableWeightList = () => (
  <div className={styles.tableWeightList}>
    <Table columns={columns} dataSource={data} />
  </div>
);

export default TableWeightList;
