import React, { Component } from "react";
import BurgerBuilder from "./Container/BurgerBuilder/BurgerBuilder";
import CheckOut from "./Container/CheckOut/CheckOut";
import Orders from "./Container/CheckOut/Orders/Orders";
import { Route, Switch } from "react-router-dom";

import "./App.css";
import Layout from "./Component/Layout/Layout";

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/checkout" component={CheckOut} />
            <Route path="/Orders" component={Orders} />
            <Route path="/" component={BurgerBuilder} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
