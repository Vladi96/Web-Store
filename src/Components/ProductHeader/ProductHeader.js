import React from "react";
import ImageView from "../ImageView/ImageView";
import ShortProductInfo from "../ShortProductInfo/ShortProductInfo";

import "./ProductHeader.css";

const productHeader = props => {
  return (
    <div className="ProductHeader-Container">
      <h1 className="ProductHeader-Title">
        {props.product.productData.product_name}
      </h1>
      <div className="ProductHeader-ShortDetails">
        {props.product.images ? (
          <ImageView images={props.product.images} />
        ) : null}
        {props.product ? (
          <ShortProductInfo
            {...props.product.productData}
            productKey={props.product.key}
            orderClick={props.orderClick}
          />
        ) : null}
      </div>
    </div>
  );
};

export default productHeader;
