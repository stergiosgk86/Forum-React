import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import ErrorHandler from "./components/ErrorHandler/ErrorHandler";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.render(
  <BrowserRouter>
    <ErrorHandler />
    <ToastContainer />
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
