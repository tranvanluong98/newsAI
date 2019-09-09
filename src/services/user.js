import { GET } from '@/core/dataFetchActions';
import dataProvider from '@/services/dataProvider';

export async function query() {
  return dataProvider(GET, '/auth/users');
}

export async function queryCurrent() {
  return dataProvider(GET, '/api/currentUser');
}
