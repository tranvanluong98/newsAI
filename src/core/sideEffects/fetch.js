import get from 'lodash/get';
import { notification } from 'antd';
import { router } from 'umi';
import {
  FETCH_CANCEL,
  FETCH_END,
  FETCH_ERROR,
  FETCH_START,
} from '@/core/actions/fetchActions';
import { NOTIFICATION_EFFECT_HANDLE } from '@/core/actions/notificationActions';
import { RESOURCE_REFRESH_VIEW } from '@/core/actions/resourceActions';
import {
  fetchActionsWithArrayOfIdentifiedRecordsResponse,
  fetchActionsWithArrayOfRecordsResponse,
  fetchActionsWithRecordResponse,
  fetchActionsWithTotalResponse,
} from '@/core/dataFetchActions';

function validateResponseFormat(
  response,
  type,
  logger = console.error, // eslint-disable-line no-console
) {
  if (!Object.prototype.hasOwnProperty.call(response, 'data')) {
    logger(
      `The response to '${type}' must be like { data: ... }, but the received response does not have a 'data' key. The dataProvider is probably wrong for '${type}'.`,
    );
    throw new Error('ra.notification.data_provider_error');
  }
  if (
    fetchActionsWithArrayOfRecordsResponse.includes(type) &&
    !Array.isArray(response.data)
  ) {
    logger(
      `The response to '${type}' must be like { data : [...] }, but the received data is not an array. The dataProvider is probably wrong for '${type}'`,
    );
    throw new Error('ra.notification.data_provider_error');
  }
  if (
    fetchActionsWithArrayOfIdentifiedRecordsResponse.includes(type) &&
    Array.isArray(response.data) &&
    response.data.length > 0 &&
    !Object.prototype.hasOwnProperty.call(response.data[0], 'id')
  ) {
    logger(
      `The response to '${type}' must be like { data : [{ id: 123, ...}, ...] }, but the received data items do not have an 'id' key. The dataProvider is probably wrong for '${type}'`,
    );
    throw new Error('ra.notification.data_provider_error');
  }
  if (
    fetchActionsWithRecordResponse.includes(type) &&
    !Object.prototype.hasOwnProperty.call(response.data, 'id')
  ) {
    logger(
      `The response to '${type}' must be like { data: { id: 123, ... } }, but the received data does not have an 'id' key. The dataProvider is probably wrong for '${type}'`,
    );
    throw new Error('ra.notification.data_provider_error');
  }
  if (
    fetchActionsWithTotalResponse.includes(type) &&
    !Object.prototype.hasOwnProperty.call(response, 'total')
  ) {
    logger(
      `The response to '${type}' must be like  { data: [...], total: 123 }, but the received response does not have a 'total' key. The dataProvider is probably wrong for '${type}'`,
    );
    throw new Error('ra.notification.data_provider_error');
  }
}
function* handleFetch(
  dataProvider,
  action,
  { select, put, all, call, cancelled },
) {
  const {
    type,
    payload,
    meta: { fetch: fetchMeta, onSuccess, onFailure, ...meta },
  } = action;
  const restType = fetchMeta;
  try {
    const isOptimistic = yield select(state => state.setting.optimistic);
    if (isOptimistic) {
      // in optimistic mode, all fetch actions are canceled,
      // so the admin uses the store without synchronization
      if (get(action, 'meta.notification')) {
        yield put({
          ...action,
          type: NOTIFICATION_EFFECT_HANDLE,
        });
      }
      return;
    }

    yield all([
      put({ type: `${type}Loading`, payload, meta }),
      put({ type: FETCH_START }),
    ]);
    const response = yield call(dataProvider, restType, meta.resource, payload);
    if (process.env.NODE_ENV !== 'production') {
      validateResponseFormat(response, restType);
    }
    yield put({
      type: `${type}Success`,
      payload: response,
      requestPayload: payload,
      meta: {
        ...meta,
        ...onSuccess,
        fetchResponse: restType,
        fetchStatus: FETCH_END,
      },
    });

    if (get(onSuccess, 'refresh')) {
      yield put({
        type: RESOURCE_REFRESH_VIEW,
        payload: meta.resource,
      });
    }
    if (get(onSuccess, 'notification')) {
      notification.success({
        message: get(onSuccess, 'notification.message'),
      });
      // router.replace('/posts');
    }
    if (onSuccess && onSuccess.callback) {
      yield call(onSuccess.callback, {
        payload: response,
        requestPayload: payload,
      });
    }
    yield put({ type: FETCH_END });
  } catch (error) {
    console.error(
      `handle fetch error on resource ${meta.resource} with type ${restType}`,
      error,
    );
    yield put({
      type: `${type}Failure`,
      error: error.message ? error.message : error,
      payload: error.body ? error.body : null,
      requestPayload: payload,
      meta: {
        ...meta,
        ...onFailure,
        fetchResponse: restType,
        fetchStatus: FETCH_ERROR,
      },
    });

    if (get(onFailure, 'refresh')) {
      yield put({
        type: RESOURCE_REFRESH_VIEW,
        payload: meta.resource,
      });
    }

    if (get(onFailure, 'notification')) {
      notification.error({
        message: get(onFailure, 'notification.message'),
      });
    }

    if (onFailure.callback) {
      yield call(onFailure.callback, { error, requestPayload: payload });
    }

    yield put({ type: FETCH_ERROR, error });
  } finally {
    if (yield cancelled()) {
      yield put({ type: FETCH_CANCEL });
    }
  }
}

export default handleFetch;
