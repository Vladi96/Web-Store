import React from "react";
import Hoc from "../../../Hoc/Hoc";

import "./Input.css";

//elementType
//placeholder
//onChange
//type
// value

const inputElement = props => {
  let element = null;

  switch (props.elementType.toLowerCase()) {
    case "input":
      return (element = (
        <Hoc>
          {/* <label className="Label">{props.placeholder}</label> */}
          <input
            value={props.value}
            onChange={props.onChange}
            type={props.type}
            className="Input"
            placeholder={props.placeholder}
          />
        </Hoc>
      ));

    case "textarea":
      return (element = (
        <Hoc>
          <label className="Label">{props.placeholder}</label>
          <textarea className="Textarea" placeholder={props.placeholder} />
        </Hoc>
      ));
    case "text":
      return (element = (
        <Hoc>
          <p className="Text">{props.children}</p>
        </Hoc>
      ));

    default:
      break;
  }

  return { element };
};

export default inputElement;
