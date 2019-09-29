import React from "react";
import Hoc from "../../../Hoc/Hoc";

import "./Input.css";

//elementType
//placeholder
//onChange
//type
// value

const inputElement = props => {
  switch (props.elementType.toLowerCase()) {
    case "input":
      return (
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
      );

    case "textarea":
      return (
        <Hoc>
          <label className="Label">{props.placeholder}</label>
          <textarea className="Textarea" placeholder={props.placeholder} />
        </Hoc>
      );
    case "text":
      return (
        <Hoc>
          <p className="Text">{props.children}</p>
        </Hoc>
      );
    case "select":
      let options = [];
      props.value.forEach(element => {
        options.push(
          <option key={element} value={element}>
            {element}
          </option>
        );
      });

      if (!props.value.includes(props.selected)) {
        options.push(
          <option key={props.selected} value={props.selected}>
            {props.selected}
          </option>
        );
      }

      return (
        <select
          value={props.selected}
          onChange={props.onChange}
          className="Select"
        >
          {options}
        </select>
      );

    default:
      return <></>;
  }
};

export default inputElement;
