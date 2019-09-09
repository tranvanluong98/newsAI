import { GET, POST } from '@/core/dataFetchActions';

export const API_BASE = (() => {
  // hot debug
  if (process.browser) {
    if (localStorage && localStorage.getItem('API_BASE')) {
      return localStorage.getItem('API_BASE');
    }
  }

  if (process.env.API_BASE && process.env.MOCK !== 'none') {
    return process.env.API_BASE;
  }
  return `http://127.0.0.1:${process.env.MOCK_PORT}`;
})();

export const AUTH_BASE = (() => {
  // hot debug
  if (process.browser) {
    if (localStorage && localStorage.getItem('AUTH_BASE')) {
      return localStorage.getItem('AUTH_BASE');
    }
  }

  if (process.env.AUTH_BASE && process.env.MOCK !== 'none') {
    return process.env.AUTH_BASE;
  }
  return `http://127.0.0.1:${process.env.MOCK_PORT}`;
})();

export const apiParamsKey = {
  pageSize: 'limit',
  page: 'page',
  refreshToken: 'refreshToken',
  accessToken: 'token',
};

export const dateFormat = 'DD/MM/YYYY hh:mm A';

export const generateResource = {
  getAttachFile: id => ({
    path: 'file/contractFileAttach',
    defaultParams: { contractId: id },
    type: GET,
  }),
  getAttachDoc: id => ({
    path: 'file/contractDocAttach',
    defaultParams: { contractId: id },
    type: GET,
  }),
  postAttachDoc: () => ({
    path: 'file/contractFileAttach',
    type: POST,
  }),
  postAttachFile: () => ({
    path: 'file/contractFileAttach',
    type: POST,
  }),
  delAttachFile: id => ({
    path: `file/contractFileAttach/${id}`,
    type: GET,
  }),
  delAttachDoc: id => ({
    path: `file/contractDocAttach/${id}`,
    type: GET,
  }),
};
