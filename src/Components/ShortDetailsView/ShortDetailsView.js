import React from "react";
import EachDetail from "./EachDetailsView/EachDetailsView";

import "./ShortDetailsView.css";

const items = props => {
  return (
    <div className="ShortProductView-Container">
      {props.details && props.clicked ? (
        <EachDetail details={props.details} clicked={props.clicked} />
      ) : null}
    </div>
  );
};

export default items;
