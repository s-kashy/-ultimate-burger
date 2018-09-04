import React, { Component } from "react";
import BurgerBuilder from "./Container/BurgerBuilder/BurgerBuilder";
import CheckOut from "./Container/CheckOut/CheckOut";
import LogOut from "./Container/LogOut/logOut";
import Orders from "./Container/CheckOut/Orders/Orders";
import * as actionType from "./store/actions/index";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import "./App.css";

import Layout from "./Component/Layout/Layout";
import Auth from "./Container/Auth/Auth";

class App extends Component {
  componentDidMount() {
    this.props.authToken();
  }
  render() {
    let redirectAuth = (
      <Switch>
        <Route path="/auth" component={Auth} />
        <Route path="/" component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );
    if (this.props.auth) {
      redirectAuth = (
        <Switch>
          <Route path="/checkout" component={CheckOut} />
          <Route path="/Orders" component={Orders} />
          <Route path="/logout" component={LogOut} />
          <Route path="/auth" component={Auth} />
          <Route path="/" component={BurgerBuilder} />
          <Redirect to="/" />
        </Switch>
      );
    }
    return (
      <div>
        <Layout>{redirectAuth}</Layout>
      </div>
    );
  }
}
const mapStateHandler = state => {
  return {
    auth: state.auth.token !== null
  };
};
const mapStateDispatch = dispatch => {
  return {
    authToken: () => dispatch(actionType.authCheckState())
  };
};

export default withRouter(
  connect(
    mapStateHandler,
    mapStateDispatch
  )(App)
);
