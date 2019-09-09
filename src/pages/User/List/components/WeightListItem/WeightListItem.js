import React, { Component } from 'react';
import './WeightListItem.css';

// eslint-disable-next-line react/prefer-stateless-function
class WeightListItem extends Component {
  render() {
    const { title, unit, mass, unitPrice, intoMoney } = this.props;
    return (
      <div className="WeightListItem">
        <div className="title">{title}</div>
        <div className="unit">{unit}</div>
        <div className="block">
          <div className="mass">{mass}</div>
          <div className="unitPrice">{unitPrice}</div>
          <div className="intoMoney">{intoMoney}</div>
        </div>
      </div>
    );
  }
}

export default WeightListItem;
