import React from "react";
import Hoc from "../../../Hoc/Hoc";
import Button from "../../UI/Button/Button";
import Input from "../../UI/Input/Input";

import { connect } from "react-redux";

import "./EachDetailsView.css";

const eachDetail = props => {
  let data = [];
  let classes = [
    "Short-Product-View",
    "ShortProductView-Image",
    "Info-Container",
    "OrderBtn",
    "Order"
  ];

  if (props.type === "Purchases") {
    classes = [
      "ShortPurchasesView",
      "ShortPurchaseImage",
      "PurchaseInfo",
      "RemoveBtn",
      "Remove",
      "PriceContainer"
    ];
  }

  for (const key in props.details) {
    const countPurchased = props.cart.filter(product => product === key).length;
    data.push(
      <div key={key} className={classes[0]}>
        <h2 onClick={() => props.clicked(key)}>
          {props.details[key].productData.product_name}
        </h2>
        <img
          className={classes[1]}
          onClick={() => props.clicked(key)}
          src={props.details[key].image}
          alt="Product"
        />
        <div className={classes[2]}>
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

        <div className={classes[5]}>
          <p className="Price">
            {props.type === "Purchases" ? (
              <Input
                onChange={e => props.changeNumberOfProduct(key, e)}
                elementType="select"
                selected={countPurchased}
                value={[1, 2, 3, 4]}
              ></Input>
            ) : null}
            Price: $
            {new Intl.NumberFormat("en-IN").format(
              props.type
                ? countPurchased * props.details[key].productData.price
                : props.details[key].productData.price
            )}
          </p>
        </div>

        <div className={classes[3]}>
          <Button
            click={
              props.type === "Purchases"
                ? () => props.removePurchase(key)
                : () => props.orderClick(key)
            }
            type={classes[4]}
          >
            {props.type === "Purchases" ? "X" : "Add to Cart"}
          </Button>
        </div>
      </div>
    );
  }
  if (data.length < 1) {
    data.push(
      <h4 className="NotFound" key="Not Found">
        {props.type === "Purchases" ? "Empty Cart!" : "Not Found!"}
      </h4>
    );
  }
  return <Hoc>{data}</Hoc>;
};

const mapStateToProps = state => ({
  cart: state.cart
});

export default connect(mapStateToProps)(eachDetail);
