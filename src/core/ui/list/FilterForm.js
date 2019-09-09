import { Form } from 'antd';
import React, { useMemo, useCallback, useContext, useEffect } from 'react';
import lodashGet from 'lodash/get';
import lodashSet from 'lodash/set';

const FilterFormProsCtx = ({ filters, className, form, children, Context }) => {
  const {
    resource,
    hideFilter,
    displayedFilters,
    setFilters,
    filterValues,
  } = useContext(Context);

  const initialValues = useMemo(
    () => ({
      ...filters
        .filter(
          filterElement => filterElement.alwaysOn && filterElement.defaultValue,
        )
        .reduce(
          (acc, filterElement) =>
            lodashSet(
              { ...acc },
              filterElement.source,
              filterElement.defaultValue,
            ),
          {},
        ),
      ...filterValues,
    }),
    [filterValues, filters],
  );

  useEffect(() => {
    filters.forEach(filter => {
      if (filter.alwaysOn && filter.defaultValue) {
        throw new Error(
          'Cannot use alwaysOn and defaultValue on a filter input. Please set the filterDefaultValues props on the <List> element instead.',
        );
      }
    });
  }, [filters]);

  const shownFilter = useMemo(
    () =>
      filters.filter(
        filterElement =>
          filterElement.alwaysOn ||
          displayedFilters[filterElement.source] ||
          typeof lodashGet(initialValues, filterElement.source) !== 'undefined',
      ),
    [displayedFilters, filters, initialValues],
  );
  const handleHide = useCallback(
    event => {
      hideFilter(event.currentTarget.dataset.key);
    },
    [hideFilter],
  );

  return (
    <FilterFormAntd
      className={className}
      initialValues={initialValues}
      setFilters={setFilters}
      handleHide={handleHide}
      shownFilter={shownFilter}
      resource={resource}
    >
      {children}
    </FilterFormAntd>
  );
};

const FilterForm = ({
  className,
  form,
  initialValues,
  setFilters,
  handleHide,
  children,
  shownFilter,
  resource,
}) => {
  const { validateFields, getFieldDecorator } = form;
  const handleSubmit = useCallback(
    e => {
      e.preventDefault();

      validateFields((err, fieldsValue) => {
        if (err) {
          return;
        }
        setFilters(fieldsValue);
      });
    },
    [setFilters, validateFields],
  );

  return (
    <div className={className}>
      <Form onSubmit={handleSubmit}>
        {typeof children === 'function'
          ? children({
              initialValues,
              handleHide,
              shownFilter,
              resource,
              getFieldDecorator,
            })
          : React.cloneElement(children, {
              initialValues,
              handleHide,
              shownFilter,
              resource,
              getFieldDecorator,
            })}
      </Form>
    </div>
  );
};

const FilterFormAntd = Form.create({
  name: 'filterForm',
  onFieldsChange: (props, changedFields, allFields) => {
    const { form, setFilters } = props;
    console.log('changedFields ', changedFields, ' allFields ', allFields);
    form.validateFields((err, fieldsValue) => {
      console.log('fieldsValue ', fieldsValue, ' err ', err);
      if (err) {
        return;
      }
      setFilters(fieldsValue);
    });
  },
})(React.memo(FilterForm));

export default FilterFormProsCtx;
