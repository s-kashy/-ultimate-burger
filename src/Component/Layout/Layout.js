import React, { Component } from "react";
import Toolbar from "../ToolBar/ToolBar";
import Aux from "../../Hoc/Hoc";
import { connect } from "react-redux";
import classes from "./Layout.css";
import SideDrawer from "../SideDrawer/SideDrawer";
class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    };
  }

  clickBackDropHandler = () => {
    console.log("click on back Drop");
    this.setState({ show: false });
  };
  clickOnDrawerToggle = () => {
    this.setState(prevState => {
      return { show: !prevState.show };
    });
  };
  render() {
    return (
      <Aux>
        <Toolbar clicked={this.clickOnDrawerToggle} auth={this.props.auth} />
        <SideDrawer
          auth={this.props.auth}
          visible={this.state.show}
          clickBackDrop={this.clickBackDropHandler}
        />

        <main className={classes.content}>{this.props.children}</main>
      </Aux>
    );
  }
}
const mapStateProps = state => {
  return {
    auth: state.auth.token
  };
};
export default connect(mapStateProps)(Layout);
