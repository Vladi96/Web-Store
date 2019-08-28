import React from "react";
import ImageView from "../ImageView/ImageView";
import ShortProductInfo from "../ShortProductInfo/ShortProductInfo";

import "./ProductHeader.css";

const productHeader = props => {
  return (
    <div className="ProductHeader-Container">
      <h1 className="ProductHeader-Title">{props.data.product_name}</h1>
      <div className="ProductHeader-ShortDetails">
        {props.images ? <ImageView images={props.images} /> : null}
        {props.data ? <ShortProductInfo {...props.data} /> : null}
      </div>
    </div>
  );
};

export default productHeader;
