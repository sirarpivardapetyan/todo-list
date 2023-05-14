import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-datepicker/dist/react-datepicker.css";
import 'react-toastify/dist/ReactToastify.css';
import "./App.css";
import Todo from "./components/todo/Todo";

const App = () => {
  return (
    <div className="App">
          <main>
        <Todo />
      </main>
    </div>
  );
};

export default App;
