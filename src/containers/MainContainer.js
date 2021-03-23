import React, { Component } from 'react';
import StockContainer from './StockContainer'
import PortfolioContainer from './PortfolioContainer'
import SearchBar from '../components/SearchBar'

class MainContainer extends Component {

  constructor() {
    super()

    this.state = {
      allStocks: [],
      myStocks: [],
      filter: "All",
      sort: "None"
    }

  }

  componentDidMount() {

    fetch('http://localhost:3000/stocks')
      .then(res => res.json())
      .then(stocksData => {
        this.setState({
          allStocks: stocksData
        })
      })

  }

  addStock = (stock) => {
    this.setState({
      myStocks: [...this.state.myStocks, stock]
    })
  }

  calcDisplayStocks = () => {
    let filteredStocks = this.state.allStocks
    if(this.state.filter !== "All") {
      filteredStocks = filteredStocks.filter(stock => stock.type === this.state.filter)
    }

    switch(this.state.sort){
      case "Alphabetically":
        return filteredStocks.sort((a, b) => a.name > b.name ? 1 : -1)
      case "Price":
        return filteredStocks.sort((a, b) => a.price - b.price)
      default:
        return filteredStocks
    }

  }

  updateFilter = (type) => {
    this.setState({
      filter: type
    })
  }

  updateSort = (sortBy) => {
    this.setState({
      sort: sortBy
    })
  }

  render() {

    let displayStocks = this.calcDisplayStocks()

    return (
      <div>
        <SearchBar filter={this.state.filter} sort={this.state.sort} updateFilter={this.updateFilter} updateSort={this.updateSort} />

          <div className="row">
            <div className="col-8">

              <StockContainer stocks={displayStocks} buyStock={this.addStock} />

            </div>
            <div className="col-4">

              <PortfolioContainer stocks={this.state.myStocks} />

            </div>
          </div>
      </div>
    );
  }

}

export default MainContainer;
