import React from "react";
import "./BackDrop.css";

const backDrop = props => {
  return <div className="BackDrop" onClick={props.closeMenu}></div>;
};

export default backDrop;
