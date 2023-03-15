import React from "react";
import "./App.css";
import Product from "./components/Product";
import { Component } from "react";

class App extends Component {
  state = {
    products: [
      {
        name: "bananas",
        price: "1",
        description: "Fresh bananas from Ecuador",
      },
      {
        name: "pie",
        price: "2",
        description: "Fresh pies from Armenia",
      },
      {
        name: "orange",
        price: "5",
        description: "Fresh oranges from Kanada",
      },
    ],
  };

  render() {
    const productComponents = this.state.products.map((product) => {
      return (
        <Product
          key={product.name}
          name={product.name}
          price={product.price}
          description={product.description}
        />
      );
    });

    return <div className="App">{productComponents}</div>;
  }
}

export default App;
