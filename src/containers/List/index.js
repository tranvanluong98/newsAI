import { Card, Tabs } from 'antd';
import React, { useMemo } from 'react';
import classnames from 'classnames';

import styles from './TableList.less';

const sanitizeRestProps = ({
  actions,
  basePath,
  bulkActions,
  changeListParams,
  children,
  classes,
  className,
  crudGetList,
  currentSort,
  data,
  defaultTitle,
  displayedFilters,
  exporter,
  filter,
  filterDefaultValues,
  filters,
  filterValues,
  hasCreate,
  hasEdit,
  hasList,
  hasShow,
  hideFilter,
  history,
  ids,
  isLoading,
  loadedOnce,
  locale,
  location,
  match,
  onSelect,
  onToggleItem,
  onUnselectItems,
  options,
  page,
  pagination,
  params,
  permissions,
  perPage,
  push,
  query,
  refresh,
  resource,
  selectedIds,
  setFilters,
  setPage,
  setPerPage,
  setSelectedIds,
  setSort,
  showFilter,
  sort,
  theme,
  title,
  toggleItem,
  total,
  translate,
  version,
  ...rest
}) => rest;

const ListView = ({
  actions,
  bulkActions,
  bulkActionButtons,
  className,
  classes,
  columns,
  exporter,
  tableOptions,
  title,
  filters,
  handleChangeTabs = () => null,
  activeTabKey,
  children,
  tabs,
  ...rest
}) => {
  let activeKey = activeTabKey;
  if (!activeKey) {
    const firstChild = React.Children.toArray(children)[0];
    activeKey = firstChild && firstChild.props.tabKey;
  }

  const renderContent = useMemo(() => {
    const matchTabNode = React.Children.toArray(children).find(
      child => child.props.tabKey && child.props.tabKey === activeTabKey,
    );
    if (matchTabNode && matchTabNode.props.noAction) {
      return matchTabNode;
    }
    return (
      <Card bordered={false}>
        <div className={styles.tableList} {...sanitizeRestProps(rest)}>
          <div className={styles.tableHeader}>
            <div className={styles.title}>{title}</div>
            <div>
              {actions &&
                React.cloneElement(actions, {
                  exporter,
                  ...actions.props,
                })}
            </div>
          </div>
          {React.Children.map(children, child =>
            child.props.tabKey === activeTabKey ? child : null,
          )}
        </div>
      </Card>
    );
  }, [actions, activeTabKey, children, exporter, rest, title]);
  return (
    <>
      {(filters || tabs) && (
        <Card
          bordered={false}
          className={classnames(styles.filterSection, {
            [styles.filterSectionWithTabs]: tabs,
          })}
        >
          {filters}
          {tabs && (
            <Tabs
              activeKey={activeTabKey}
              onTabClick={key => handleChangeTabs(key)}
            >
              {tabs.map(tab => (
                <Tabs.TabPane tab={tab.name} key={tab.key} />
              ))}
            </Tabs>
          )}
        </Card>
      )}
      {renderContent}
    </>
  );
};

ListView.displayName = 'ListView';

export default ListView;
