import React from "react";
import Input from "../UI/Input/Input";
import Button from "../UI/Button/Button";

import "./ShortProductInfo.css";

const shortProductInfo = props => {
  return (
    <div className="ProductHeader-ShortInfo-Container">
      <div className="ProductHeader-ShortInfo">
        <Input elementType="text">
          <span className="PropName">Processor Model</span>:{" "}
          {props.processor_model}
        </Input>
        <Input elementType="text">
          <span className="PropName">Screen Size</span>: {props.screen_size}
        </Input>
        <Input elementType="text">
          {" "}
          <span className="PropName">Storage Type</span>: {props.storage_type}
        </Input>
        <Input elementType="text">
          {" "}
          <span className="PropName">Total Storage Capacity</span>:{" "}
          {props.total_storage_capacity}
        </Input>
        <Input elementType="text">
          {" "}
          <span className="PropName">System Memory</span>: {props.system_memory}
        </Input>
        <Input elementType="text">
          {" "}
          <span className="PropPrice">Price: ${props.price}</span>
        </Input>
      </div>
      <Button type="Order">Add to Cart</Button>
    </div>
  );
};

export default shortProductInfo;
