import React from "react";
import EachDetail from "./EachDetailsView/EachDetailsView";

import "./ShortDetailsView.css";

const items = props => {
  return (
    <div className="ShortProductView-Container">
      {props.details && props.clicked ? <EachDetail {...props} /> : null}
    </div>
  );
};

export default items;
