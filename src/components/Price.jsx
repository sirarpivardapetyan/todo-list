import { Component } from "react";

class Price extends Component {
  constructor(props) {
    super(props);
    this.state = {
      price: `${props.text}$`,
      exchangeRate: 392,
    };
  }

  changeCurrency = () => {
    const { price, exchangeRate } = this.state;
    let changedPrice;
    if (price.endsWith("$")) {
      changedPrice = parseFloat(price) * exchangeRate + "֏";
    } else {
      changedPrice = parseFloat(price) / exchangeRate + "$";
    }
    this.setState({
      price: changedPrice,
    });
  };
  
  render() {
    return (
      <>
        <span>Price: {this.state.price} </span>
        <button onClick={this.changeCurrency}>Change the currency</button>
      </>
    );
  }
}

export default Price;
