import React from "react";
import classes from "./ToolBar.css";
import Logo from "../Logo/Logo";
import Navigations from "../Navigation/Navigations";
import DrawerToggle from "../DrawerToggle/DrawerToggle";

const toolBar = props => {
  return (
    <div className={classes.Toolbar}>
      <DrawerToggle clicked={props.clicked} />
      <div className={classes.Logo}>
        <Logo />
      </div>
      <nav className={classes.DesktopOnly}>
        <Navigations />
      </nav>
    </div>
  );
};

export default toolBar;
