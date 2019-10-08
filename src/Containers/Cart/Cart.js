import React, { Component } from "react";
import { connect } from "react-redux";

import EachDetailsView from "../../Components/ShortDetailsView/EachDetailsView/EachDetailsView";
import Button from "../../Components/UI/Button/Button";

import "./Cart.css";

class Cart extends Component {
  removePurchaseHandler(key) {
    this.props.removePurchase(key);
  }

  clickViewPurchaseHandler(key) {
    this.props.history.push({
      pathname: "/product/" + key
    });
  }

  changeNumberOfProductHandler(key, e) {
    this.props.changeNumberPurchases(e.target.value, key);
  }

  makeOrderHandler() {
    if (!this.props.token) {
      return this.props.history.push("/account");
    }
    this.props.makeOrder(this.props.totalPrice);
    this.props.history.push("/checkout");
  }

  render() {
    return (
      <div className="Cart">
        <EachDetailsView
          type="Purchases"
          details={this.props.productData}
          clicked={key => this.clickViewPurchaseHandler(key)}
          removePurchase={key => this.removePurchaseHandler(key)}
          changeNumberOfProduct={(key, e) =>
            this.changeNumberOfProductHandler(key, e)
          }
        ></EachDetailsView>

        {this.props.cart.length > 0 ? (
          <div className="PurchaseOrderBtn">
            <Button click={() => this.makeOrderHandler()} type="Order">
              Order Now
            </Button>
          </div>
        ) : null}
        <div className="CartFooter">
          <p className="PriceLine">
            <span className="TotalPrice">Total price</span>: ${" "}
            {new Intl.NumberFormat("en-IN").format(
              Math.abs(this.props.totalPrice.toFixed(2))
            )}
          </p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  cart: state.cart,
  token: state.token,
  totalPrice: state.totalPrice,
  productData: state.productData
});

const mapDispatchToProps = dispatch => ({
  removePurchase: key => dispatch({ type: "REMOVE_PURCHASE", data: { key } }),
  changeNumberPurchases: (newNumber, key) =>
    dispatch({
      type: "CHANGE_NUMBER_PRODUCT",
      data: { newNumber, key }
    }),
  makeOrder: totalPrice =>
    dispatch({ type: "MAKE_ORDER", data: { totalPrice } })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cart);
