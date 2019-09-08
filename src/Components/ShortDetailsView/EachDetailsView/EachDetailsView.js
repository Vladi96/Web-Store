import React from "react";
import Hoc from "../../../Hoc/Hoc";
import Button from "../../UI/Button/Button";

import "./EachDetailsView.css";

const eachDetail = props => {
  let data = [];

  for (const key in props.details) {
    data.push(
      <div key={key} className="Short-Product-View">
        <h2 onClick={() => props.clicked(key)}>
          {props.details[key].productData.product_name}
        </h2>
        <img
          className="ShortProductView-Image"
          onClick={() => props.clicked(key)}
          src={props.details[key].image}
          alt="Product"
        />
        <div className="Info-Container">
          <p>
            <b>Processor</b>: {props.details[key].productData.processor_model}
          </p>
          <p>
            <b> System Memory (RAM)</b>:{" "}
            {props.details[key].productData.system_memory}
          </p>
          <p>
            <b>Screen Size</b>: {props.details[key].productData.screen_size}
          </p>
          <p>
            <b>Total Storage Capacity</b>:{" "}
            {props.details[key].productData.total_storage_capacity}
          </p>
        </div>
        <p className="Price">Price: ${props.details[key].productData.price}</p>
        <div className="OrderBtn">
          <Button type="Order">Add to Cart</Button>
        </div>
      </div>
    );
  }
  if (data.length < 1) {
    data.push(<h3 key="Not Found">Not Found!</h3>);
  }
  return <Hoc>{data}</Hoc>;
};

export default eachDetail;
