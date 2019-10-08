import React, { Component } from "react";
import { connect } from "react-redux";

import Button from "../../Components/UI/Button/Button";
import Input from "../../Components/UI/Input/Input";
import CheckOutSummary from "../../Components/CheckOutSummary/CheckOutSummary";

import "./Checkout.css";
import axios from "axios";

class Checkout extends Component {
  state = {
    form: {
      firstName: { value: "", valid: null },
      lastName: { value: "", valid: null },
      address: { value: "", valid: null }
    },
    isValid: false,
    isSubmitted: false
  };

  changeInputHandler(e, key) {
    const state = { ...this.state.form };
    state[key].value = e.target.value.trim();

    if (state[key].value !== "") {
      state[key].valid = true;
    } else {
      state[key].valid = false;
    }

    this.setState({ form: state });
  }

  submitOrder = e => {
    e.preventDefault();
    const checkState = { ...this.state.form };
    let checkValidity = true;

    for (const key in checkState) {
      if (!checkState[key].valid) {
        checkValidity = false;
        checkState[key].valid = false;
      }
    }

    this.setState({ isValid: checkValidity, form: checkState });
  };

  handlerBtnBack = event => {
    this.props.history.goBack();
  };

  handlerMakeOrder = () => {
    const details = [];

    this.props.cart.forEach(element => {
      details.push(this.props.productData[element]);
    });

    const data = {
      details,
      email: this.props.email,
      userId: this.props.userId,
      date: `${("0" + new Date().getDate()).slice(-2)}/${(
        "0" +
        (new Date().getMonth() + 1)
      ).slice(-2)}/${new Date().getFullYear()}`,
      totalPrice: this.props.totalPrice
    };

    axios
      .post(
        "https://web-shop-00.firebaseio.com/orders.json?auth=" +
          this.props.token,
        data
      )
      .then(res => {
        if (res.status === 200) {
          this.setState({ isSubmitted: true });
          this.props.submitOrder();
          this.props.history.push("/");
        }
      })
      .catch(e => console.log(e));
  };

  render() {
    return (
      <>
        <div
          className={["Checkout", this.state.isValid ? " Disable" : null].join(
            ""
          )}
        >
          <h1>Contact Details</h1>
          <div>
            <form onSubmit={this.submitOrder}>
              <div>
                <p>Email:</p>
                <Input
                  elementType="input"
                  value={this.props.email}
                  onChange={() => {}}
                ></Input>
              </div>

              <div
                className={
                  this.state.form.firstName.valid === false
                    ? "InvalidInput"
                    : "ValidInput"
                }
              >
                <p>First Name:</p>
                <Input
                  elementType="input"
                  value={this.state.form.firstName.value}
                  onChange={e => this.changeInputHandler(e, "firstName")}
                ></Input>
              </div>
              <div
                className={
                  this.state.form.lastName.valid === false
                    ? "InvalidInput"
                    : "ValidInput"
                }
              >
                <p>Last Name:</p>
                <Input
                  elementType="input"
                  value={this.state.form.lastName.value}
                  onChange={e => this.changeInputHandler(e, "lastName")}
                ></Input>
              </div>
              <div
                className={
                  this.state.form.address.valid === false
                    ? "InvalidInput"
                    : "ValidInput"
                }
              >
                <p>Address:</p>
                <Input
                  elementType="input"
                  value={this.state.form.address.value}
                  onChange={e => this.changeInputHandler(e, "address")}
                ></Input>
              </div>
              <div className="SubmitBtn">
                <Button>Submit</Button>
              </div>
            </form>
          </div>
        </div>
        {this.state.isValid ? (
          <CheckOutSummary
            goBack={this.handlerBtnBack}
            makeOrder={this.handlerMakeOrder}
            email={this.props.email}
            {...this.state.form}
          ></CheckOutSummary>
        ) : this.isSubmitted ? (
          <div>"da"</div>
        ) : null}
      </>
    );
  }
}

const mapStateToProps = state => ({
  totalPrice: state.totalPrice,
  email: state.email,
  cart: state.cart,
  userId: state.userId,
  productData: state.productData,
  token: state.token
});

const mapDispatchToProps = dispatch => ({
  submitOrder: () => dispatch({ type: "SUBMIT_ORDER" })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Checkout);
