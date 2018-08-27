import React, { Component } from "react";
import BurgerBuilder from "./Container/BurgerBuilder/BurgerBuilder";
import CheckOut from "./Container/CheckOut/CheckOut";
import LogOut from "./Container/LogOut/logOut";
import Orders from "./Container/CheckOut/Orders/Orders";
import { Route, Switch } from "react-router-dom";

import "./App.css";
import Layout from "./Component/Layout/Layout";
import Auth from "./Container/Auth/Auth";

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/checkout" component={CheckOut} />
            <Route path="/Orders" component={Orders} />
            <Route path="/auth" component={Auth} />
            <Route path="/logout" component={LogOut} />
            <Route path="/" component={BurgerBuilder} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
