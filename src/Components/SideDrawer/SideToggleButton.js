import React from "react";

import "./SideToggleButton.css";

const sideDrawer = props => {
  return (
    <div className="SideToggleButton" onClick={props.toggleMenu}>
      <div className="Button-Line"></div>
      <div className="Button-Line"></div>
      <div className="Button-Line"></div>
    </div>
  );
};

export default sideDrawer;
