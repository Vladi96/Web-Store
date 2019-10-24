import React, { Component } from "react";
import axios from "axios";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";

import Header from "./Containers/Header/Header";
import ControlAdminPanel from "./Containers/Admin/ControlPanel/ControlPanel";
import ViewItems from "./Containers/ViewItems/ViewItems";
import Product from "./Containers/Product/Product";
import Account from "./Containers/Account/Account";
import Cart from "./Containers/Cart/Cart";
import Checkout from "./Containers/Checkout/Checkout";
import SideDrawer from "./Components/SideDrawer/SideDrawer";
import BackDrop from "./Components/SideDrawer/BackDrop";

import "./App.css";

class App extends Component {
  componentDidMount() {
    if (localStorage.token) {
      axios
        .post(
          "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyBm1TTJBHwknOYmhQgOjt_HhlWO31cYfic",
          {
            idToken: localStorage.token
          }
        )
        .then(res => {
          this.props.logUser(
            localStorage.token,
            localStorage.localId,
            res.data.users[0].email
          );
        })
        .catch(error => {
          console.log(error.response);
        });
    }
    if (localStorage.cart) {
      localStorage.cart.split(",").forEach(element => {
        axios(
          `https://web-shop-00.firebaseio.com/short-details/-LkiyEvGXFJGRvcQIRXr/${element}.json`
        )
          .then(res => {
            const updatedFullData = this.props.productData;
            updatedFullData[element] = res.data;
            let totalPrice = this.props.totalPrice;
            totalPrice += res.data.productData.price;

            this.props.updateOrder(updatedFullData, totalPrice);
          })
          .catch(e => console.log(e));
      });
    }
  }

  state = {
    showMenu: false
  };

  handlerToggleMenu = () => {
    this.setState(prevState => {
      return { showMenu: !prevState.showMenu };
    });
  };

  render() {
    return (
      <>
        <Header toggleMenu={this.handlerToggleMenu} />

        <SideDrawer showMenu={this.state.showMenu}></SideDrawer>
        {this.state.showMenu ? (
          <BackDrop
            closeMenu={() => this.setState({ showMenu: false })}
          ></BackDrop>
        ) : null}

        <div className="App">
          <Switch>
            <Route path="/dashboard" component={ControlAdminPanel} />
            <Route path="/product" component={Product} />
            <Route exact={true} path="/account" component={Account} />
            <Route exact={true} path="/cart" component={Cart} />
            {this.props.token ? (
              <Route exact={true} path="/checkout" component={Checkout} />
            ) : null}
            <Route exact={true} path="/" component={ViewItems} />
          </Switch>
        </div>
      </>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  logUser: (token, localId, email) =>
    dispatch({
      type: "SIGN_IN_USER",
      data: { token, localId, email }
    }),
  updateOrder: (productData, totalPrice) =>
    dispatch({ type: "UPDATE_ORDER_DATA", data: { productData, totalPrice } })
});

const mapStateToProps = state => ({
  productData: state.productData,
  totalPrice: state.totalPrice,
  token: state.token
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
