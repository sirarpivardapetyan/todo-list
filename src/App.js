import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Todo from "./components/Todo";



const App = () => {
  return (
    <div className="App">
      <header className="p-3 App-header" bg="success" text="white">
        <div class="title d-flex justify-content-center align-items-center">
          <h3 className="p-3">ToDoList</h3>
        </div>
        </header>
        <main >
        <Todo/>

           
        </main>
    </div>
  );
};

export default App;
