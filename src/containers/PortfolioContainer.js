import React, { Component } from 'react';
import Stock from '../components/Stock'

class PortfolioContainer extends Component {

  render() {
    return (
      <div>
        <h2>My Portfolio</h2>
        {this.props.stocks.length > 0 ? this.props.stocks.map(stock => <Stock stock={stock} />) : <p>Add Stocks By Clicking On Their Card</p>}
      </div>
    );
  }

}

export default PortfolioContainer;
