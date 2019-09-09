import { createSelector } from 'reselect';
import { parse } from 'query-string';
import { stringify } from 'qs';
import { useDispatch, useSelector } from 'react-redux';
import { useMemo, useCallback, useState, useEffect } from 'react';
import debounce from 'lodash/debounce';
import get from 'lodash/get';
import isEqual from 'lodash/isEqual';
import pickBy from 'lodash/pickBy';

import { changeListParams as changeListParamsAction } from '@/core/actions/resourceActions/listActions';
import queryReducer, {
  SET_FILTER,
  SORT_DESC,
} from '@/core/reducers/resource/list/query2Params';
import removeEmpty from '@/utils/removeEmpty';
import removeKey from '@/utils/removeKey';

export const getLocationPath = props => props.location.pathname;
export const getLocationSearch = props => props.location.search;

export const validQueryParams = ['page', 'perPage', 'sort', 'order', 'filter'];

export const selectQuery = createSelector(
  getLocationPath,
  getLocationSearch,
  (path, search) => {
    const query = pickBy(
      parse(search),
      (v, k) => validQueryParams.indexOf(k) !== -1,
    );
    if (query.filter && typeof query.filter === 'string') {
      try {
        query.filter = JSON.parse(query.filter);
      } catch (err) {
        delete query.filter;
      }
    }
    return query;
  },
);

function hasCustomParams(params) {
  return (
    params &&
    params.filter &&
    (Object.keys(params.filter).length > 0 ||
      params.order != null ||
      params.page !== 1 ||
      params.perPage != null ||
      params.sort != null)
  );
}

export const getQueryFunc = ({
  query: queryProps,
  params,
  filterDefaultValues,
  permanentFilter,
  sort,
  perPage,
}) => {
  let query = {};
  if (Object.keys(queryProps) > 0) {
    query = queryProps;
  } else {
    query = hasCustomParams(params)
      ? { ...params }
      : { filter: { ...filterDefaultValues, ...permanentFilter } };
  }

  if (!query.sort) {
    query.sort = sort.field;
    query.order = sort.order;
  }
  if (!query.perPage) {
    query.perPage = perPage;
  }
  if (!query.page) {
    query.page = 1;
  }
  return query;
};

const useListParameter = ({
  location,
  push,
  noRouteOnParamsChange,
  filterDefaultValues,
  permanentFilter,
  query: queryProps,
  resource,
  updateData,
  sort = {
    field: 'id',
    order: SORT_DESC,
  },
  perPage = 10,
  debounceTime = 500,
}) => {
  const [filters, updateFilters] = useState({});
  const params = useSelector(state =>
    get(state, ['resources', resource, 'list', 'params']),
  );
  const version = useSelector(state =>
    get(state, ['resources', resource, 'viewVersion']),
  );
  const query = useMemo(
    () => (!noRouteOnParamsChange ? selectQuery({ location }) : {}),
    [location, noRouteOnParamsChange],
  );
  const dispatch = useDispatch();
  const changeListParams = (...args) =>
    dispatch(changeListParamsAction(...args));

  const getFilterValues = useCallback(() => query.filter || {}, [query.filter]);

  const getQuery = useCallback(
    () =>
      getQueryFunc({
        query: queryProps,
        params,
        filterDefaultValues,
        permanentFilter,
        sort,
        perPage,
      }),
    [filterDefaultValues, params, perPage, permanentFilter, queryProps, sort],
  );

  const changeParams = useCallback(
    action => {
      const newParams = queryReducer(getQuery(), action);
      if (!noRouteOnParamsChange) {
        push({
          ...location,
          search: `?${stringify({
            ...newParams,
            filter: JSON.stringify(newParams.filter),
          })}`,
        });
      }
      changeListParams(resource, newParams);
    },
    [
      changeListParams,
      getQuery,
      location,
      noRouteOnParamsChange,
      push,
      resource,
    ],
  );

  const setFilters = useCallback(
    debounce(fs => {
      if (isEqual(fs, getFilterValues())) {
        return;
      }

      // fix for redux-form bug with onChange and enableReinitialize
      const filtersWithoutEmpty = removeEmpty(fs);
      this.changeParams({ type: SET_FILTER, payload: filtersWithoutEmpty });
    }, debounceTime),
    [],
  );

  const showFilter = useCallback(
    (filterName, defaultValue) => {
      updateFilters({ ...filters, [filterName]: true });
      if (typeof defaultValue !== 'undefined') {
        setFilters({
          ...this.getFilterValues(),
          [filterName]: defaultValue,
        });
      }
    },
    [filters, setFilters],
  );

  const hideFilter = useCallback(
    filterName => {
      updateFilters({ ...filters, [filterName]: false });
      const newFilters = removeKey(this.getFilterValues(), filterName);
      setFilters(newFilters);
    },
    [filters, setFilters],
  );

  useEffect(() => {
    updateData();
  }, [
    query,
    params,
    resource,
    permanentFilter,
    sort,
    perPage,
    version,
    updateData,
  ]);

  return { setFilters, showFilter, hideFilter, changeParams, getQuery, query };
};

export default useListParameter;
