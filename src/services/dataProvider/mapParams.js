import get from 'lodash/get';

const mapKey = {
  perPage: 'size',
  filter: 'filters',
};

const mapParams = (params = {}) => {
  let newParams = {
    ...params,
    ...params.pagination,
    pagination: undefined,
    _keyword: get(params, 'filter._keyword'),
    sorts: {},
  };
  if (params.sort && params.sort.field) {
    newParams.sorts[params.sort.field] =
      params.sort.order === 'descend' ? -1 : 1;
  }
  newParams = Object.keys(mapKey).reduce(
    (acc, paramKey) => ({
      ...acc,
      [mapKey[paramKey]]: acc[paramKey],
      [paramKey]: undefined,
    }),
    newParams,
  );
  Object.keys(newParams).forEach(key => {
    if (newParams[key] === undefined || newParams[key] === null) {
      delete newParams[key];
    }
  });
  return newParams;
};

export default mapParams;
