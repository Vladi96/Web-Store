import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";

import EachDetailsView from "../../Components/ShortDetailsView/EachDetailsView/EachDetailsView";
import Button from "../../Components/UI/Button/Button";

import "./Cart.css";

class Cart extends Component {
  state = {
    fullData: [],
    cart: [],
    totalPrice: 0
  };

  _isMounted = false;
  _dataWasGet = false;

  componentDidMount() {
    this._isMounted = true;

    if (this._isMounted) {
      this.setState({ cart: this.props.cart }, () => {
        this._dataWasGet = true;

        this.state.cart.forEach(element => {
          axios(
            `https://web-shop-00.firebaseio.com/short-details/-LkiyEvGXFJGRvcQIRXr/${element}.json`
          )
            .then(res => {
              const updatedFullData = this.state.fullData;
              updatedFullData[element] = res.data;
              let totalPrice = this.state.totalPrice;
              totalPrice += res.data.productData.price;

              this.setState({ fullData: updatedFullData, totalPrice });
            })
            .catch(e => console.log(e));
        });
      });
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps, nextState) {
    if (nextProps.cart) {
      let totalPrice = 0;
      let fullData = this.state.fullData;
      nextProps.cart.forEach(key => {
        totalPrice += fullData[key].productData.price;
      });
      this.setState({ cart: nextProps.cart, totalPrice });
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  removePurchaseHandler(key) {
    this.props.removePurchase(key);
    let updatedPurchases = this.state.fullData;

    let totalPrice = this.state.totalPrice;
    totalPrice -= updatedPurchases[key].productData.price;

    let updatedCart = this.props.cart;
    updatedCart.splice(updatedCart.indexOf(key), 1);

    if (updatedCart.indexOf(key) === -1) {
      delete updatedPurchases[key];
    }

    this.setState({
      fullData: updatedPurchases,
      totalPrice,
      cart: updatedCart
    });
  }

  clickViewPurchaseHandler(key) {
    this.props.history.push({
      pathname: "/product/" + key,
      state: { key }
    });
  }

  changeNumberOfProductHandler(key, e) {
    this.props.changeNumberPurchases(e.target.value, key);
  }

  render() {
    return (
      <div className="Cart">
        {this._dataWasGet ? (
          <EachDetailsView
            type="Purchases"
            details={this.state.fullData}
            clicked={key => this.clickViewPurchaseHandler(key)}
            removePurchase={key => this.removePurchaseHandler(key)}
            changeNumberOfProduct={(key, e) =>
              this.changeNumberOfProductHandler(key, e)
            }
          ></EachDetailsView>
        ) : null}
        {this.props.cart.length > 0 ? (
          <div className="PurchaseOrderBtn">
            <Button type="Order">Order Now</Button>
          </div>
        ) : null}
        <div className="CartFooter">
          <p className="PriceLine">
            <span className="TotalPrice">Total price</span>: ${" "}
            {new Intl.NumberFormat("en-IN").format(
              Math.abs(this.state.totalPrice.toFixed(2))
            )}
          </p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  cart: state.cart
});

const mapDispatchToProps = dispatch => ({
  removePurchase: key => dispatch({ type: "REMOVE_PURCHASE", data: { key } }),
  changeNumberPurchases: (newNumber, key) =>
    dispatch({
      type: "CHANGE_NUMBER_PRODUCT",
      data: { newNumber, key }
    })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cart);
