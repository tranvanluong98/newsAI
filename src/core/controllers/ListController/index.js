/* eslint no-console: ["error", { allow: ["warn", "error"] }] */
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { formatMessage } from 'umi-plugin-locale';
import { parse, stringify } from 'query-string';
import { routerRedux } from 'dva/router';
import React, { PureComponent, isValidElement } from 'react';
import compose from 'recompose/compose';
import debounce from 'lodash/debounce';
import get from 'lodash/get';
import inflection from 'inflection';
import isEqual from 'lodash/isEqual';
import pickBy from 'lodash/pickBy';
import withRouter from 'umi/withRouter';

import {
  changeListParams as changeListParamsAction,
  setListSelectedIds as setListSelectedIdsAction,
  toggleListItem as toggleListItemAction,
} from '@/core/actions/resourceActions/listActions';
import { crudGetList as crudGetListAction } from '@/core/actions/resourceActions/dataActions';
import {
  registerResource as registerResourceAction,
  unregisterResource as unregisterResourceAction,
} from '@/core/actions/resourceActions';
import queryReducer, {
  SET_SORT,
  SET_PAGE,
  SET_PER_PAGE,
  SET_FILTER,
  SORT_DESC,
} from '@/core/reducers/resource/list/query2Params';
import removeEmpty from '@/utils/removeEmpty';
import removeKey from '@/utils/removeKey';

import checkMinimumRequiredProps from '../checkMinimumRequiredProps';

/**
 * List page component
 *
 * The <List> component renders the list layout (title, buttons, filters, pagination),
 * and fetches the list of records from the REST API.
 * It then delegates the rendering of the list of records to its child component.
 * Usually, it's a <Datagrid>, responsible for displaying a table with one row for each post.
 *
 * In Redux terms, <List> is a connected component, and <Datagrid> is a dumb component.
 *
 * Props:
 *   - title
 *   - perPage
 *   - sort
 *   - filter (the permanent filter to apply to the query)
 *   - actions
 *   - filters (a React Element used to display the filter form)
 *   - pagination
 *
 * @example
 *     const PostFilter = (props) => (
 *         <Filter {...props}>
 *             <TextInput label="Search" source="q" alwaysOn />
 *             <TextInput label="Title" source="title" />
 *         </Filter>
 *     );
 *     export const PostList = (props) => (
 *         <List {...props}
 *             title="List of posts"
 *             sort={{ field: 'published_at' }}
 *             filter={{ is_published: true }}
 *             filters={<PostFilter />}
 *         >
 *             <Datagrid>
 *                 <TextField source="id" />
 *                 <TextField source="title" />
 *                 <EditButton />
 *             </Datagrid>
 *         </List>
 *     );
 */

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

export class UnconnectedListController extends PureComponent {
  static defaultProps = {
    debounce: 500,
    filter: {},
    perPage: 10,
    sort: {
      field: 'id',
      order: SORT_DESC,
    },
    Context: React.createContext(),
  };

  /**
   * Check if user has already set custom sort, page, or filters for this list
   *
   * User params come from the Redux store as the params props. By default,
   * this object is:
   *
   * { filter: {}, order: null, page: 1, perPage: null, sort: null }
   *
   * To check if the user has custom params, we must compare the params
   * to these initial values.
   *
   * @param {object} params
   */

  state = {};

  setFilters = debounce(filters => {
    if (isEqual(filters, this.getFilterValues())) {
      return;
    }

    // fix for redux-form bug with onChange and enableReinitialize
    const filtersWithoutEmpty = removeEmpty(filters);
    this.changeParams({ type: SET_FILTER, payload: filtersWithoutEmpty });
  }, this.props.debounce);

  componentDidMount() {
    const {
      filter,
      query = {},
      ids,
      params = {},
      total,
      changeListParams,
      resource,
      registerResource,
      resourceState,
    } = this.props;

    if (!resourceState) {
      registerResource({ resource });
      return;
    }

    if (filter && isValidElement(filter)) {
      throw new Error(
        '<List> received a React element as `filter` props. If you intended to set the list filter elements, use the `filters` (with an s) prop instead. The `filter` prop is internal and should not be set by the developer.',
      );
    }
    if (!query.page && !(ids || []).length && params.page > 1 && total > 0) {
      this.setPage(params.page - 1);
      return;
    }

    this.updateData();
    if (Object.keys(query).length > 0) {
      changeListParams(resource, query);
    }
  }

  componentDidUpdate(prevProps) {
    const {
      query,
      filter,
      sort,
      perPage,
      resource,
      version,
      permanentFilter,
      params,
      resourceState,
    } = this.props;
    if (
      (!resourceState && prevProps.resourceState) ||
      prevProps.resource !== resource ||
      prevProps.version !== version ||
      prevProps.perPage !== perPage ||
      !isEqual(prevProps.query, query) ||
      !isEqual(prevProps.filter, filter) ||
      !isEqual(prevProps.permanentFilter, permanentFilter) ||
      !isEqual(prevProps.sort, sort)
    ) {
      this.updateData();
    }
  }

  componentWillUnmount() {
    const { resource, unregisterResource } = this.props;
    this.setFilters.cancel();
    unregisterResource({ resource });
  }

  /**
   * Merge list params from 4 different sources:
   *   - the query string
   *   - the params stored in the state (from previous navigation)
   *   - the filter defaultValues
   *   - the props passed to the List component
   */
  getQuery = props => {
    const {
      query: queryProps,
      params,
      filterDefaultValues,
      sort,
      perPage,
      permanentFilter,
    } = props || this.props;
    let query = {};
    if (queryProps && Object.keys(queryProps).length > 0) {
      query = queryProps;
    } else {
      query = hasCustomParams(params)
        ? {
            ...params,
            filter: {
              ...filterDefaultValues,
              ...params.filter,
              ...permanentFilter,
            },
          }
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

  getFilterValues = () => {
    const query = this.getQuery();
    return query.filter || {};
  };

  setSort = (field, order) =>
    this.changeParams({ type: SET_SORT, payload: { sort: field, order } });

  setPage = page => this.changeParams({ type: SET_PAGE, payload: page });

  setPerPage = perPage =>
    this.changeParams({ type: SET_PER_PAGE, payload: perPage });

  showFilter = (filterName, defaultValue) => {
    this.setState({ [filterName]: true });
    if (typeof defaultValue !== 'undefined') {
      this.setFilters({
        ...this.getFilterValues(),
        [filterName]: defaultValue,
      });
    }
  };

  hideFilter = filterName => {
    this.setState({ [filterName]: false });
    const newFilters = removeKey(this.getFilterValues(), filterName);
    this.setFilters(newFilters);
  };

  handleSelect = ids => {
    const { setSelectedIds, resource } = this.props;
    setSelectedIds(resource, ids);
  };

  handleUnselectItems = () => {
    const { setSelectedIds, resource } = this.props;
    setSelectedIds(resource, []);
  };

  handleToggleItem = id => {
    const { toggleItem, resource } = this.props;
    toggleItem(resource, id);
  };

  updateData = query => {
    const { resource, crudGetList } = this.props;
    const params = query || this.getQuery();
    const { sort, order, page = 1, perPage, filter } = params;
    const pagination = {
      page: parseInt(page, 10),
      perPage: parseInt(perPage, 10),
    };
    crudGetList(resource, pagination, { field: sort, order }, { ...filter });
  };

  changeParams = action => {
    const newParams = queryReducer(this.getQuery(), action);
    const {
      push,
      resource,
      location,
      changeListParams,
      noRouteOnParamsChange,
    } = this.props;
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
  };

  render() {
    const {
      basePath,
      children,
      resource,
      hasCreate,
      data,
      ids,
      loadedOnce,
      total,
      isLoading,
      version,
      selectedIds,
      resourceState,
    } = this.props;

    if (!resourceState) {
      return '';
    }
    const query = this.getQuery();
    const resourceName = formatMessage(
      {
        id: `resources.${resource}.name`,
      },
      {
        smart_count: 2,
        _: inflection.humanize(inflection.pluralize(resource)),
      },
    );
    const defaultTitle = formatMessage(
      {
        id: 'ra.page.list',
      },
      {
        name: resourceName,
      },
    );
    const { Context } = this.props;
    return (
      <Context.Provider
        value={{
          basePath,
          currentSort: {
            field: query.sort,
            order: query.order,
          },
          data,
          defaultTitle,
          displayedFilters: this.state,
          filterValues: this.getFilterValues(),
          hasCreate,
          hideFilter: this.hideFilter,
          ids,
          isLoading,
          loadedOnce,
          onSelect: this.handleSelect,
          onToggleItem: this.handleToggleItem,
          onUnselectItems: this.handleUnselectItems,
          page:
            (typeof query.page === 'string'
              ? parseInt(query.page, 10)
              : query.page) || 1,
          perPage:
            (typeof query.perPage === 'string'
              ? parseInt(query.perPage, 10)
              : query.perPage) || 10,
          resource,
          selectedIds,
          setFilters: this.setFilters,
          setPage: this.setPage,
          setPerPage: this.setPerPage,
          setSort: this.setSort,
          showFilter: this.showFilter,
          total,
          version,
        }}
      >
        {children}
      </Context.Provider>
    );
  }
}

const injectedProps = [
  'basePath',
  'currentSort',
  'data',
  'defaultTitle',
  'displayedFilters',
  'filterValues',
  'hasCreate',
  'hideFilter',
  'ids',
  'isLoading',
  'loadedOnce',
  'onSelect',
  'onToggleItem',
  'onUnselectItems',
  'page',
  'perPage',
  'refresh',
  'resource',
  'selectedIds',
  'setFilters',
  'setPage',
  'setPerPage',
  'setSort',
  'showFilter',
  'total',
  'version',
];

/**
 * Select the props injected by the ListController
 * to be passed to the List children need
 * This is an implementation of pick()
 */
export const getListControllerProps = props =>
  injectedProps.reduce((acc, key) => ({ ...acc, [key]: props[key] }), {});

/**
 * Select the props not injected by the ListController
 * to be used inside the List children to sanitize props injected by List
 * This is an implementation of omit()
 */
export const sanitizeListRestProps = props =>
  Object.keys(props)
    .filter(propName => !injectedProps.includes(propName))
    .reduce((acc, key) => ({ ...acc, [key]: props[key] }), {});

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

function mapStateToProps(state, props) {
  const resourceState = state.resources[props.resource];
  if (!resourceState) {
    return {};
  }
  return {
    resourceState,
    query: !props.noRouteOnParamsChange ? selectQuery(props) : {},
    params: resourceState.list.params,
    ids: resourceState.list.ids,
    loadedOnce: resourceState.list.loadedOnce,
    selectedIds: resourceState.list.selectedIds,
    total: resourceState.list.total,
    data: resourceState.data,
    isLoading: state.loading > 0,
    version: get(resourceState, ['viewVersion']),
  };
}

const ListController = compose(
  checkMinimumRequiredProps('ListController', ['location', 'resource']), // temporary delete basePath
  connect(
    mapStateToProps,
    {
      crudGetList: crudGetListAction,
      registerResource: registerResourceAction,
      unregisterResource: unregisterResourceAction,
      changeListParams: changeListParamsAction,
      setSelectedIds: setListSelectedIdsAction,
      toggleItem: toggleListItemAction,
      push: routerRedux.push,
    },
  ),
)(UnconnectedListController);

ListController.whyDidYouRender = true;

export default withRouter(ListController);
