import React from 'react';
import classnames from 'classnames';

import ConfigRadio from '@/components/Input/ConfigRadio';
import ConfigSelect from '@/components/Input/ConfigSelect';
import commonStyles from '@/common.less';

const id2Field = {
  categoryId: (
    <ConfigSelect
      configKey="categories"
      style={{ marginRight: 21, flexBasis: '366px' }}
      normalizeOpt={val => ({ name: val.name, value: val.id })}
    />
  ),
  costCategoryId: (
    <ConfigSelect
      configKey="costCategory"
      style={{ marginRight: 21, flexBasis: '366px' }}
    />
  ),
  statusId: (
    <ConfigRadio
      configKey="status"
      style={{ width: 350 }}
      defaultValue={null}
      prependOptions={[
        {
          value: null,
          name: 'Tất cả',
        },
      ]}
    />
  ),
};

const Filters = ({ initialValues, getFieldDecorator }) => (
  <div className={classnames(commonStyles.flex)}>
    <div className={classnames(commonStyles.flex, commonStyles.flexGrow1)}>
      {getFieldDecorator('categoryId', {
        initialValue: initialValues.projectId,
      })(id2Field.categoryId)}
      {getFieldDecorator('costCategoryId', {
        initialValue: initialValues.costCategoryId,
      })(id2Field.costCategoryId)}
    </div>
    <div className={commonStyles.flexShrink0}>
      {getFieldDecorator('statusId', {
        initialValue: initialValues.statusId,
      })(id2Field.statusId)}
    </div>
  </div>
);

export default Filters;
