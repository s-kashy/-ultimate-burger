import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionType from "../../store/actions/index";
import { Redirect } from "react-router-dom";
class LogOut extends Component {
  componentWillMount() {
    this.props.authLogOut();
  }
  render() {
    return <Redirect to="/" />;
  }
}

const mapStateProps = state => {
  return {};
};
const mapDispatchToProps = dispatch => {
  return {
    authLogOut: () => dispatch(actionType.logOut())
  };
};
export default connect(
  mapStateProps,
  mapDispatchToProps
)(LogOut);
