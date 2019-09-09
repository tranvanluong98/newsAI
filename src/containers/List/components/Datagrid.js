import { Table } from 'antd';
import React, { useCallback, useState, useContext, useMemo } from 'react';
import { formatMessage } from 'umi-plugin-locale';

const Datagrid = ({ Context, ...props }) => {
  const {
    currentSort,
    data = {},
    ids = [],
    isLoading,
    loadedOnce,
    onSelect,
    onToggleItem,
    selectedIds = [],
    setPage,
    setSort,
    page,
    total,
    version,
    perPage,
  } = useContext(Context);
  const {
    // basePath,
    // body,
    // children,
    // classes,
    // className,
    // expand,
    hasBulkActions = false,
    // hover,
    // resource,
    // rowClick,
    // rowStyle,
    rowKey,
    columns,
    tableOptions,
  } = props;
  /**
   * if loadedOnce is false, the list displays for the first time,
   * and the dataProvider hasn't answered yet
   * if loadedOnce is true, the data for the list has at least been
   * returned once by the dataProvider
   * if loadedOnce is undefined, the Datagrid parent doesn't track
   * loading state (e.g. ReferenceArrayField)
   */

  const [drawerIsOpen, updateDrawIsOpen] = useState(false);

  const handleRowClick = useCallback(() => {
    updateDrawIsOpen(!drawerIsOpen);
  }, [drawerIsOpen]);

  const handlePageChange = useCallback(
    p => {
      const nBPages = Math.ceil(total / perPage) || 1;

      if (p <= 0 || p > nBPages) {
        throw new Error(
          formatMessage(
            { id: 'ra.navigation.page_out_of_boundaries' },
            {
              p,
            },
          ),
        );
      }
      setPage(p);
    },
    [perPage, total, setPage],
  );

  const handleTableChange = useCallback(
    (pagination, filters, sorter) => {
      if (sorter.field && sorter.order) {
        if (
          currentSort.field !== sorter.field ||
          currentSort.order !== sorter.order
        ) {
          setSort(sorter.field, sorter.order);
        }
      } else if (pagination.current === page) {
        setSort(null, null);
      }
    },
    [currentSort.field, currentSort.order, page, setSort],
  );

  const rowSelection = useMemo(
    () =>
      hasBulkActions
        ? {
            selectedRowKeys: selectedIds,
            onSelect: record => {
              onToggleItem(record.id);
            },
            onSelectAll: selected => {
              if (selected) {
                onSelect(
                  ids.reduce(
                    (idList, id) =>
                      idList.includes(id) ? idList : idList.concat(id),

                    selectedIds,
                  ),
                );
              } else {
                onSelect([]);
              }
            },
          }
        : null,
    [hasBulkActions, ids, onSelect, onToggleItem, selectedIds],
  );

  const refinedColumns = useMemo(
    () =>
      columns.map(col => {
        const r = { ...col };
        if (col.sorter) {
          r.sorter = true;
          r.sortOrder = currentSort.field === r.key ? currentSort.order : null;
        }
        return r;
      }),
    [columns, currentSort.field, currentSort.order],
  );

  if (loadedOnce === false) {
    return 'loading';
  }

  /**
   * Once loaded, the data for the list may be empty. Instead of
   * displaying the table header with zero data rows,
   * the datagrid displays nothing in this case.
   */
  if (!isLoading && (ids.length === 0 || total === 0)) {
    return 'Không có dữ liệu';
  }

  /**
   * After the initial load, if the data for the list isn't empty,
   * and even if the data is refreshing (e.g. after a filter change),
   * the datagrid displays the current data.
   */

  return (
    <Table
      version={version}
      rowKey={rowKey || 'key'}
      rowSelection={rowSelection}
      columns={refinedColumns}
      onChange={handleTableChange}
      dataSource={ids && ids.map(id => data[id])}
      onRow={(record, rowIndex) => ({
        onClick: () => handleRowClick(record, rowIndex),
      })}
      pagination={{
        pageSize: perPage,
        onChange: p => handlePageChange(p),
        total,
        current: page,
      }}
      total={total}
      {...tableOptions}
    />
  );
};

export default React.memo(Datagrid);
