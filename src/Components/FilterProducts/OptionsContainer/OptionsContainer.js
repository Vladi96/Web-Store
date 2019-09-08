import React from "react";
import { withRouter } from "react-router-dom";

import "./OptionsContainer.css";

const optionsContainer = props => {
  let list = [];

  let filters = props.history.location.search.split("?");

  props.options.forEach(element => {
    const classes = ["OptionsContainer-Item"];

    filters.forEach(el => {
      if (
        el.includes(element.replace(/"/, "").replace(/\s/g, "_")) &&
        el.includes(props.title.replace(/\s/g, "-"))
      ) {
        classes.push("isActive");
      }
    });

    list.push(
      <li
        className={classes.join(" ")}
        key={element}
        onClick={() => {
          props.clicked(
            props.title.replace(/\s/g, "-"),
            element.replace(/\s/g, "_")
          );
        }}
      >
        {element}
      </li>
    );
  });

  return (
    <div className="OptionsContainer">
      <h3 className="OptionsContainer-Title">{props.title}</h3>
      <ul>{list}</ul>
    </div>
  );
};

export default withRouter(optionsContainer);
