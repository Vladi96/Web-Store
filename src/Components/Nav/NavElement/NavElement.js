import React from "react";
import { NavLink } from "react-router-dom";
import { withRouter } from "react-router-dom";
import Hoc from "../../../Hoc/Hoc";

import "./NavElement.css";

const navElement = props => {
  return (
    <Hoc>
      {props.path ? (
        <NavLink exact={true} className="Nav-Element" to={props.path}>
          {props.children}
        </NavLink>
      ) : null}
    </Hoc>
  );
};

export default withRouter(navElement);
