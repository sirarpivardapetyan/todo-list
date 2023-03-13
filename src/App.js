import React from "react";
import Hello from "../src/components/Hello.jsx";
import {Button} from "../src/components/Button";
import "./App.css";

const App = () => {
  return (
    <div className="App">
      <Hello title="Hello, It`s my first react code"/>
      <Button text = "My name is Jhon"/>
    </div>
  );
};

export default App;
