import { stringify } from 'qs';
import axios from 'axios';

import { API_BASE, AUTH_BASE } from '@/config';
import RequestError from './error';

const axiosDataIns = axios.create({
  baseURL: API_BASE,
  headers: {
    // "Accept": 'application/json',

    'x-language': 'vi',
  },
});

const axiosAuthIns = axios.create({
  baseURL: AUTH_BASE,
  headers: {
    // "Accept": 'application/json',

    'x-language': 'vi',
  },
});

const callWithAxiosIns = axiosIns => async (
  method,
  path,
  params,
  headers = {},
  token = null,
) => {
  const requestHeaders = headers;
  if (token) {
    requestHeaders.Authorization = `Bearer ${token}`;
  }
  try {
    let args = [
      path,
      {
        headers: {
          ...requestHeaders,
        },
      },
    ];

    if (method === 'post' || method === 'put') {
      args = [
        args[0],
        params,
        {
          ...args[1],
        },
      ];
    }

    if (method === 'get') {
      args = [
        params && Object.keys(params).length > 0
          ? `${path}?${stringify(params)}`
          : path,
        {
          headers: {
            ...requestHeaders,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      ];
    }

    // if request hasFile
    if (params && params.hasFile) {
      const acc = new FormData();
      delete params.hasFile;
      await Object.keys(params).forEach(key => {
        acc.append(key, params[key]);
      });
      args = [
        path,
        acc,
        {
          headers: {
            ...requestHeaders,
            'content-type': 'multipart/form-data',
          },
        },
      ];
    }
    if (method === 'delete') {
      args = [
        path,
        {
          headers: {
            ...requestHeaders,
          },
        },
      ];
    }
    const resp = await axiosIns[method](...args);
    if (resp.statusText === 'OK' || (resp.status >= 200 && resp.status < 300)) {
      return resp.data;
    }

    throw new RequestError(resp);
  } catch (e) {
    throw e;
  }
};

const dataCall = callWithAxiosIns(axiosDataIns);
const authCall = callWithAxiosIns(axiosAuthIns);

export { dataCall, authCall };
