import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Hoc from "../../Hoc/Hoc";

import NavElement from "./NavElement/NavElement";
import SideToggleButton from "../SideDrawer/SideToggleButton";

import "./Nav.css";

class Nav extends Component {
  render() {
    let nav = (
      <Hoc>
        <SideToggleButton toggleMenu={this.props.toggleMenu}></SideToggleButton>

        <NavElement path={"/"}>Home</NavElement>
        <NavElement path={"/account"}>
          <div className="IconLink">
            <svg viewBox="61.1 211.4 471.6 419.1">
              <path d="M297.6 449.5c-65.5 0-119.1-53.6-119.1-119.1s53.6-119.1 119.1-119.1S416.7 265 416.7 330.5c0 65.4-53.6 119-119.1 119zm0-202.4c-45.8 0-83.3 37.5-83.3 83.3s37.5 83.3 83.3 83.3 83.3-37.5 83.3-83.3-37.4-83.3-83.3-83.3z"></path>
              <path d="M516.1 630.5H79.2c-5.4 0-10.7-2.4-14.3-7.1-3.6-4.2-4.8-10.1-3-15.5 3.6-13.7 8.3-26.8 13.1-39.9 26.8-66.1 70.2-110.7 119.1-122 9.5-2.4 19 1.2 25.6 9.5 23.2 28 49.4 42.3 77.4 42.3 28 0 54.2-14.9 77.4-42.9 6.5-8.3 16.1-11.3 25.6-9.5 48.8 11.3 92.3 55.4 119.1 122 5.4 12.5 9.5 26.2 13.1 39.9 1.2 5.4.6 11.3-3 15.5-2.5 5.3-7.8 7.7-13.2 7.7zm-412.5-35.7h388.1c-1.8-4.2-3-8.9-4.8-13.1-20.8-52.4-53-88.1-88.1-98.8-29.2 33.9-64.3 51.2-101.2 51.2s-72-17.9-101.2-51.2c-35.1 10.7-66.7 46.4-88.1 98.8-1.7 4.1-2.9 8.9-4.7 13.1zm89.3-116.1zm209.5 0z"></path>
            </svg>
          </div>
        </NavElement>
        <NavElement count={this.props.cart.length} path={"/cart"}>
          <div className="IconLink">
            <svg viewBox="29.9 182.8 535.6 476.2">
              <path d="M47.7 182.838c-9.9 0-17.9 8-17.9 17.9 0 9.9 8 17.9 17.9 17.9h56.9l61.4 289.6c2.4 10.9 9.6 20 18.6 19.9h297.6c9.4.1 18.1-8.4 18.1-17.9s-8.7-18-18.1-17.9H199.1l-7.6-35.7h314.6c8-.1 15.5-6.1 17.3-14l41.7-178.6c2.3-10.4-6.7-21.7-17.3-21.8H146.3l-9.7-45.4c-1.7-7.9-9.4-14.1-17.5-14.1H47.7zm106.1 95.2h371.5l-33.3 142.9H184.1l-30.3-142.9zm90.4 262c-32.7 0-59.5 26.9-59.5 59.5 0 32.7 26.9 59.5 59.5 59.5 32.7 0 59.5-26.9 59.5-59.5 0-32.7-26.9-59.5-59.5-59.5zm178.5 0c-32.7 0-59.5 26.9-59.5 59.5 0 32.7 26.9 59.5 59.5 59.5 32.7 0 59.5-26.9 59.5-59.5.1-32.7-26.8-59.5-59.5-59.5zm-178.5 35.7c13.4 0 23.8 10.4 23.8 23.8s-10.4 23.8-23.8 23.8-23.8-10.4-23.8-23.8c-.1-13.4 10.4-23.8 23.8-23.8zm178.5 0c13.4 0 23.8 10.4 23.8 23.8s-10.4 23.8-23.8 23.8-23.8-10.4-23.8-23.8 10.5-23.8 23.8-23.8z"></path>
            </svg>
          </div>
        </NavElement>
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
  email: state.email,
  cart: state.cart
});

export default connect(mapStateToProps)(withRouter(Nav));
