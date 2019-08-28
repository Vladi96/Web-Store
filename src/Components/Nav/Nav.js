import React from "react";
import { withRouter } from "react-router-dom";
import Hoc from "../../Hoc/Hoc";

import NavElement from "./NavElement/NavElement";

import "./Nav.css";

const nav = props => {
  let nav = (
    <Hoc>
      <NavElement path={"/"}>Home</NavElement>
      <NavElement path={"/acount"}>Account</NavElement>
      <NavElement path={"/cart"}>Cart</NavElement>
    </Hoc>
  );
  if (props.location.pathname.split("/")[1] === "dashboard") {
    nav = (
      <Hoc>
        <NavElement path={"/dashboard/"}>Home</NavElement>
        <NavElement path={"/dashboard/add"}>Add</NavElement>
      </Hoc>
    );
  }
  return <nav className="Nav">{nav}</nav>;
};

export default withRouter(nav);
