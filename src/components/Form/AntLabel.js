import React from 'react';

const AntLabel = ({ label, useFor, isRequired }) => (
  <div className="ant-col ant-form-item-label">
    <label
      htmlFor={useFor}
      className={isRequired ? 'ant-form-item-required' : ''}
      title={label}
    >
      {label}
    </label>
  </div>
);

export default AntLabel;
