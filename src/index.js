import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import burgerBuilder from "./store/reducers/burgerBuilder";
import ordersBurger from "./store/reducers/burgerBuilder";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
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

const rooReducer = combineReducers({
  ing: burgerBuilder,
  orders: ordersBurger
});

// const logger = store => {
//   return next => {
//     return action => {
//       console.log("middelWare Dispatching ", action);
//       const result = next(action);
//       console.log("getStores", store.getState());
//       return result;
//     };
//   };
// };
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rooReducer, composeEnhancers(applyMiddleware(thunk)));

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
ReactDOM.render(app, document.getElementById("root"));
registerServiceWorker();
