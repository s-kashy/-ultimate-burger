import React from "react";
import classes from "./SideDrawer.css";
import Logo from "../Logo/Logo";
import Navigations from "../Navigation/Navigations";
import BackDrop from "../UI/BackDrop/BackDrop";
import Aux from "../../Hoc/Hoc";
const SideDrawer = props => {
  let attachClasses = [classes.SideDrawer, classes.Close];
  if (props.visible) {
    attachClasses = [classes.SideDrawer, classes.open];
  }
  return (
    <Aux>
      <BackDrop visible={props.visible} clickBackDrop={props.clickBackDrop} />
      <div className={attachClasses.join(" ")}>
        <div className={classes.Logo}>
          <Logo  />
        </div>
        <Navigations />
      </div>
    </Aux>
  );
};
export default SideDrawer;
