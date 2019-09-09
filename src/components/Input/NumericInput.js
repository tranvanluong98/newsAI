import { Input } from 'antd';
import React from 'react';
import numeral from 'numeral';

class NumericInput extends React.Component {
  onChange = e => {
    const { value } = e.target;
    const reg = /^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:(\.|,)\d+)?$/;
    if (reg.test(value) || value === '' || value === '-') {
      this.props.onChange(numeral(value));
    }
  };

  // '.' at the end or only '-' in the input box.
  onBlur = () => {
    const { onBlur } = this.props;
    if (onBlur) {
      onBlur();
    }
  };

  render() {
    const { value } = this.props;
    return (
      <Input
        {...this.props}
        value={numeral(this.props.value).format('0,0[.]0000')}
        onChange={this.onChange}
        onBlur={this.onBlur}
        maxLength={25}
      />
    );
  }
}

export default NumericInput;
