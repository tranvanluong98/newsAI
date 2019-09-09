import React from 'react';
import { storiesOf } from '@storybook/react';
import TablePayList from './components/PayList/index';
import TableWeightList from './components/WeightList';
import TableActivityList from './components/ActivityList';

storiesOf('Contract Page', module)
  .add('TableWeightList', () => <TableWeightList />)
  .add('TablePayList', () => <TablePayList />)
  .add('TableActivityList', () => <TableActivityList />);
