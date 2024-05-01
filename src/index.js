import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import "mdb-ui-kit/css/mdb.min.css";
import * as mdb from "mdb-ui-kit";
import { Provider } from "react-redux";
import store from "./toolkit/store";
window.mdb = mdb;
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

reportWebVitals();
