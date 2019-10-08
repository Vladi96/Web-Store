import React from "react";
import { connect } from "react-redux";

import EachDetailsView from "../ShortDetailsView/EachDetailsView/EachDetailsView";
import Button from "../UI/Button/Button";

import "./CheckOutSummary.css";

const checkOutSummary = props => {
  return (
    <div className="CheckOutSummary">
      <h1>Check Out Summary</h1>
      <div className="ShoppingDetails">
        <h2>Shipping Details</h2>
        <p>
          <span>Email:</span> {props.email}
        </p>
        <p>
          <span>Name:</span> {props.firstName.value} {props.lastName.value}
        </p>
        <p>
          <span>Address:</span> {props.address.value}
        </p>
      </div>
      <div className="ProductSummary">
        <EachDetailsView
          details={props.productData}
          type="Order"
        ></EachDetailsView>
      </div>
      <div className="SummaryPrice">
        <span>Total price:</span> ${" "}
        {new Intl.NumberFormat("en-IN").format(
          Math.abs(props.price.toFixed(2))
        )}
      </div>
      <div className="SummaryBtnContainer">
        <div className="Btn-Back">
          <Button type="Danger" click={props.goBack}>
            Back
          </Button>
        </div>
        <div className="Btn-Order">
          <Button type="Success" click={props.makeOrder}>
            Order
          </Button>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  price: state.totalPrice,
  cart: state.cart,
  productData: state.productData
});

export default connect(mapStateToProps)(checkOutSummary);
