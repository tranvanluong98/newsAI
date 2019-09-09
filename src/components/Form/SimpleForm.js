import { Form } from 'antd';
import { formatMessage } from 'umi-plugin-locale';
import React, { useCallback, useState, useEffect, useMemo } from 'react';
import get from 'lodash/get';

import devLog from '@/utils/devLog';

const SimpleForm = ({
  form,
  formalizeValues = val => val,
  save,
  children,
  resource,
  commonProps,
  notification,
  ...rest
}) => {
  const { validateFields, getFieldsValue, getFieldValue } = form;
  const [pending, updatePending] = useState(false);
  const record = useMemo(() => rest.record || {}, [rest.record]);
  const handleSubmit = useCallback(
    e => {
      e.preventDefault();

      validateFields((err, fieldsValue) => {
        if (err) {
          return;
        }

        const values = {
          ...fieldsValue,
          ...formalizeValues(fieldsValue),
        };
        updatePending(true);
        save(
          values,
          {
            onSuccess: () => {
              updatePending(false);
            },
            onFailure: () => {
              updatePending(false);
            },
          },
          notification,
        );
      });
    },
    [formalizeValues, notification, save, validateFields],
  );

  const { getFieldDecorator, resetFields } = form;

  useEffect(() => {
    devLog('reset Form because of record change ', record);
    // resetFields();
  }, [record, resetFields]);

  return (
    <Form onSubmit={handleSubmit}>
      {React.Children.map(
        children,
        formItem =>
          React.isValidElement(formItem) &&
          (formItem.props.name ? (
            <Form.Item
              label={formatMessage({
                id: `form.resource.${resource}.label.${formItem.props.name}`,
              })}
              key={formItem.props.name}
            >
              {getFieldDecorator(formItem.props.name, {
                rules: formItem.props.rules,
                initialValue:
                  typeof formItem.props.mapRecordToInitial === 'function'
                    ? formItem.props.mapRecordToInitial(
                        record[formItem.props.name],
                      )
                    : get(record, formItem.props.name),
                normalize: formItem.props.normalize,
                getValueProps: value => ({ recordId: record.id, value }),
              })(formItem)}
            </Form.Item>
          ) : (
            React.cloneElement(formItem, {
              ...commonProps,
              record,
              save,
              pending,
              getFieldsValue,
              getFieldValue,
              resetFields,
              formResource: resource,
            })
          )),
      )}
    </Form>
  );
};

const withSimpleForm = options => Form.create(options)(SimpleForm);

export default withSimpleForm;
