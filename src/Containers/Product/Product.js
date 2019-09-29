import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";

import ProductHeader from "../../Components/ProductHeader/ProductHeader";
import deliveryImg from "../../assets/images/delivery.png";
import checkImg from "../../assets/images/check.png";
import returnImg from "../../assets/images/return.png";
import FullProductDetails from "../../Components/FullProductDetails/FullProductDetails";

import "./Product.css";

class Product extends Component {
  state = {
    data: {}
  };
  _isMounted = false;

  componentDidMount() {
    this._isMounted = true;
    axios
      .get(
        "https://web-shop-00.firebaseio.com" +
          this.props.location.pathname +
          ".json"
      )
      .then(res => {
        if (this._isMounted) {
          const data = res.data;

          data["key"] = this.props.location.pathname.split("/")[2];

          this.setState({ data });
        }
      })
      .catch(e => {
        console.log(e);
      });
  }

  componentWillUnmount() {
    this.is_Mounted = false;
  }

  orderClickHandler(id) {
    this.props.purchaseProduct(id);
  }

  render() {
    return (
      <div className="Product">
        {this.state.data.images && this.state.data.productData ? (
          <ProductHeader
            orderClick={id => this.orderClickHandler(id)}
            product={this.state.data}
          />
        ) : null}
        <div className="ProductHeader-OrderStatus">
          <div className="OrderStatus-Item">
            <img src={deliveryImg} alt="Delivery" />
            <p>Free Delivery</p>
          </div>
          <div className="OrderStatus-Item">
            <img src={checkImg} alt="Check" />
            <p>30 days return option</p>
          </div>
          <div className="OrderStatus-Item">
            <img src={returnImg} alt="Return" />
            <p>Checking the shipment</p>
          </div>
        </div>
        {this.state.data.productData ? (
          <FullProductDetails data={this.state.data.productData} />
        ) : null}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  purchaseProduct: id =>
    dispatch({ type: "MAKE_PURCHASE", data: { productId: id } })
});

export default connect(
  null,
  mapDispatchToProps
)(Product);
