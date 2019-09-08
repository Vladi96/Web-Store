import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Hoc from "../../Hoc/Hoc";

import NavElement from "./NavElement/NavElement";

import "./Nav.css";

class Nav extends Component {
  render() {
    let nav = (
      <Hoc>
        <NavElement path={"/"}>Home</NavElement>
        <NavElement path={"/account"}>
          {this.props.email !== "" ? this.props.email : "Acount"}
        </NavElement>
        <NavElement path={"/cart"}>Cart</NavElement>
      </Hoc>
    );
    if (this.props.location.pathname.split("/")[1] === "dashboard") {
      nav = (
        <Hoc>
          <NavElement path={"/dashboard/"}>Home</NavElement>
          <NavElement path={"/dashboard/add"}>Add</NavElement>
        </Hoc>
      );
    }
    return <nav className="Nav">{nav}</nav>;
  }
}

const mapStateToProps = state => ({
  email: state.email
});

export default connect(mapStateToProps)(withRouter(Nav));
