import React from "react";

import Input from "../../UI/Input/Input";
import Button from "../../UI/Button/Button";

import "./ItemInfo.css";

const ItemInfo = props => {
  let inputs = [];

  for (const key in props.inputsValue) {
    if (key === "specifications") {
      inputs.push(
        <p key={key} className="Specifications">
          Specifications
        </p>
      );
    } else {
      inputs.push(
        <Input
          key={key}
          value={props.inputsValue[key].value}
          onChange={e => props.onChangeInput(e, key)}
          placeholder={
            props.inputsValue[key].placeholder[0].toUpperCase() +
            props.inputsValue[key].placeholder.slice(1)
          }
          elementType="input"
          type="text"
        />
      );
    }
  }
  inputs.push(
    <Button key={"button"} type="Success">
      Submit
    </Button>
  );

  return (
    <div className="ItemInfo">
      <form onSubmit={e => props.clicked(e)}>{inputs}</form>
    </div>
  );
};

export default ItemInfo;
