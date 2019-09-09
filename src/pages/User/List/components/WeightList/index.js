import { formatMessage } from 'umi-plugin-locale';
import React from 'react';

import Datagrid from '@/containers/List/components/Datagrid';
import ListController from '@/core/controllers/ListController';
import Resource from '@/core/Resource';

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

export const Context = React.createContext();

const TableWeightList = ({ contractId, goTo, onRowClick }) => (
  <div className={styles.tableWeightList}>
    <Resource resource="weight" hasList hasEdit hasCreate hasShow persistent>
      <ListController
        Context={Context}
        resource="weight"
        perPage={6}
        noRouteOnParamsChange
        permanentFilter={{
          contractId,
        }}
      >
        <Datagrid
          tableOptions={{
            onRow: record => ({
              onClick: () => {
                console.log('record weight row click ', record, onRowClick);
                if (typeof onRowClick === 'function') {
                  console.log('on row click');
                  onRowClick(record);
                }
                goTo(1);
              },
            }),
          }}
          columns={columns}
          Context={Context}
        />
      </ListController>
    </Resource>
  </div>
);

export default TableWeightList;
