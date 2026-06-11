import React from "react";
import ReactDOM from "react-dom/client";

import { Provider } from "react-redux";

import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import { store } from "./store/store.js";

import App from "./App.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />

    <ToastContainer position="top-right" autoClose={3000} theme="dark" />
  </Provider>,
);
