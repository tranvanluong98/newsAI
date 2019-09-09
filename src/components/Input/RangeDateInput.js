import React from 'react';
import { DatePicker } from 'antd';

const { RangePicker } = DatePicker;

const RangeDateInput = ({ value, onChange, ...rest }) => (
  <RangePicker
    onChange={momentV => {
      if (momentV && momentV.length) {
        onChange([
          momentV[0].startOf('D').valueOf(),
          momentV[1].endOf('D').valueOf(),
        ]);
        return;
      }
      onChange(undefined);
    }}
    {...rest}
  />
);

export default RangeDateInput;
