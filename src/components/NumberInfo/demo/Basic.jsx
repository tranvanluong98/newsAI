import NumberInfo from 'ant-design-pro/lib/NumberInfo';
import numeral from 'numeral';
import React from 'react';

const Basic = () => (
  <div>
    <NumberInfo
      subTitle={<span>Visits this week</span>}
      total={numeral(12321).format('0,0')}
      status="up"
      subTotal={17.1}
    />
  </div>
);

export default Basic;
