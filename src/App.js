import React from "react";
import "./App.css";
import Product from "./components/Product";

const App = () => {
  let products = [
    {
      name: "banabas",
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
  ];
  const productComponents = products.map((product)=>{
    return (
      <Product 
      key={product.name}
      name={product.name} 
      price={product.price} 
      description={product.description}
      />
    )
  });
  console.log(productComponents)
  return (
    <div className="App">
      {productComponents}
    </div>
  );
};

export default App;
