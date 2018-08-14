import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./Navigation.css";

const navigation = props => {
  return (
    <li className={classes.NavigationItem}>
      <NavLink to={props.link} exact={props.exact} className={classes.active}>
        {props.children}
      </NavLink>
    </li>
  );
};
export default navigation;
