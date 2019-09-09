import {
  CREATE,
  DELETE,
  GET,
  GET_LIST,
  GET_ONE,
  POST,
  UPDATE,
} from '@/core/dataFetchActions';
import { addAccessToken, addRequestAccessToken } from '@/utils/call/enhancers';
import { dataCall as call } from '@/utils/call';
import generalize from '@/services/dataProvider/generalize';
import mapParams from './mapParams';

export const IGNORE_REPORT_POST = '/DATA/IGNORE_REPORT_POST';
export const UPDATE_POST = '/DATA/UPDATE_POST';
export const CREATE_POST = '/DATA/CREATE_POST';
export const UPDATE_USER = '/DATA/UPDATE_USER';

export const UPDATE_STATUS_USER = '/DATA/UPDATE_STATUS_USER';

const prepareRequest = (type, resource, params, header, mP) => {
  let url = '';
  let method;
  const options = {
    headers: {
      Accept: 'application/json',
      ...header,
    },
  };
  let sendParams = mP({ ...params });
  if (sendParams.filters && typeof sendParams.filters.q === 'string') {
    sendParams.filters.q = sendParams.filters.q.trim();
  }
  switch (type) {
    /**
     * params = {
     *    pagination: {page, perPage },
     *    sorts: { [attribute]: 'ASC|DESC' },
     *    filters: {[field]: [value]}
     * }
     */
    case GET: {
      method = 'get';
      url = `/${resource}`;
      break;
    }
    case POST: {
      method = 'post';
      url = `/${resource}`;
      break;
    }
    case GET_LIST: {
      url = `/${resource}`;
      method = 'get';
      break;
    }
    case UPDATE:
      url =
        params.id !== undefined ? `/${resource}/${params.id}` : `/${resource}`;
      method = 'put';
      if (sendParams.id !== undefined) {
        delete sendParams.id;
      }
      if (sendParams.data) {
        sendParams = { ...sendParams.data };
      }
      delete sendParams.data;
      delete sendParams.previousData;
      break;
    case GET_ONE: {
      url =
        params.id !== undefined ? `/${resource}/${params.id}` : `/${resource}`;
      method = 'get';
      if (sendParams.id !== undefined) {
        delete sendParams.id;
      }
      break;
    }
    case CREATE: {
      url = `/${resource}`;
      method = 'post';
      if (sendParams.data) {
        sendParams = { ...sendParams.data };
      }
      delete sendParams.data;
      break;
    }
    case DELETE: {
      if (params.id === undefined) {
        throw new Error(
          `You should provide id of entity to delete it in ${resource}`,
        );
      }
      url = `/${resource}/${params.id}`;
      method = 'delete';
      break;
    }
    case IGNORE_REPORT_POST: {
      url = `/${resource}/ignore/${params.id}`;
      method = 'put';
      break;
    }
    case UPDATE_POST: {
      url = `/${resource}/${params.id}`;
      method = 'put';
      break;
    }
    case CREATE_POST: {
      url = `/${resource}`;
      method = 'post';
      break;
    }
    case UPDATE_USER: {
      url = `/${resource}`;
      method = 'put';
      break;
    }

    case UPDATE_STATUS_USER: {
      url = `/${resource}/${params.id}`;
      method = 'put';
      break;
    }
    default:
      throw new Error(`Unsupported Data Provider request type ${type}`);
  }

  return { url, options, method, params: sendParams };
};

const dataProvider = async (
  type,
  resource,
  params = {},
  header = {},
  accessToken = '',
) => {
  const { url, options, method, params: nParams } = prepareRequest(
    type,
    resource,
    params,
    header,
    mapParams,
  );

  try {
    const response = await call(
      method,
      url,
      nParams,
      options.headers,
      accessToken,
    );
    return generalize(type, response);
  } catch (err) {
    throw err;
  }
};

const dataProviderWithToken = addAccessToken(
  addRequestAccessToken(
    dataProvider,
    () => localStorage.getItem('refreshToken'),
    params =>
      call(
        'get',
        '/auth/refresh-token',
        {
          ...params,
        },
        {
          Accept: 'application/json',
        },
      ),
  ),
);

export default dataProviderWithToken;
