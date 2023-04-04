import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Todo from "./components/todo/Todo";
import Counter from "../src/Counter"

const App = () => {
  return (
    <div className="App">
      <header className="p-3 App-header" bg="success" text="white">
        <div className="title d-flex justify-content-center align-items-center">
          <h3 className="p-3">Todo List</h3>
        </div>
      </header>
      <main>
        <Todo />
        <Counter/>
      </main>
    </div>
  );
};

export default App;
