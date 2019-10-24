import React from "react";
import FilterProducts from "../../Components/FilterProducts/FilterProducts";

import "./SideDrawer.css";

const sideDrawer = props => {
  return props.showMenu ? (
    <div className="SideDrawer">
      <FilterProducts></FilterProducts>
    </div>
  ) : null;
};

export default sideDrawer;
