import React, { Component } from "react";
import axios from "axios";

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

  componentDidMount() {
    axios
      .get(
        "https://web-shop-00.firebaseio.com" +
          this.props.location.pathname +
          ".json"
      )
      .then(res => {
        this.setState({ data: res.data });
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    return (
      <div className="Product">
        {this.state.data.images && this.state.data.productData ? (
          <ProductHeader
            images={this.state.data.images}
            data={this.state.data.productData}
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

export default Product;
