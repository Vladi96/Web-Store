import React from "react";

import "./Button.css";

//type

const button = props => {
  let classes = ["Button", props.type];

  return <button className={classes.join(" ")}>{props.children}</button>;
};

export default button;
