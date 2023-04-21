import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-datepicker/dist/react-datepicker.css";
import 'react-toastify/dist/ReactToastify.css';
import "./App.css";
import Todo from "./components/todo/Todo";

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
      </main>
    </div>
  );
};

export default App;
