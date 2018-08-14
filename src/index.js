import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import * as firebase from "firebase";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
var config = {
  apiKey: "AIzaSyCdQU9tdij7QHG3mM8r_RDLs0UCf2wUq_8",
  authDomain: "react-my-burger-56598.firebaseapp.com",
  databaseURL: "https://react-my-burger-56598.firebaseio.com",
  projectId: "react-my-burger-56598",
  storageBucket: "react-my-burger-56598.appspot.com",
  messagingSenderId: "521616327546"
};
firebase.initializeApp(config);
const app = (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
ReactDOM.render(app, document.getElementById("root"));
registerServiceWorker();
