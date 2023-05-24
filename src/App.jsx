import React from "react";
import { ToastContainer } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-datepicker/dist/react-datepicker.css";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "../src/components/loader/Loader";
import NavBar from "./components/navBar/NavBar";
import { routes } from "./routes";

const App = () => {
  const isLoading = useSelector((store) => store.loader.isLoading);
  return (
    <BrowserRouter>
      <div className="App">
        <main>
          <NavBar />
          <Routes>
            {routes.map((page) => (
              <Route key={page.path} path={page.path} element={page.element} />
            ))}
          </Routes>
          <ToastContainer
            position="bottom-left"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
          {isLoading && <Loader />}
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
