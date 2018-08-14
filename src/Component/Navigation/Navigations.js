import React from "react";
import clasess from "./Navigation.css";
import Navigation from "./Navigation";

const navigationsItems = props => {
  return (
    <div>
      <ul className={clasess.NavigationItems}>
        <Navigation link="/" exact>
          Burger Builder
        </Navigation>
        <Navigation link="/orders">Orders</Navigation>
      </ul>
    </div>
  );
};
export default navigationsItems;
