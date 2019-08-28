import React, { Component } from "react";
import axios from "axios";

import ShortDetailsView from "../../Components/ShortDetailsView/ShortDetailsView";
import Filter from "../../Components/FilterProducts/FilterProducts";

import "./ViewItems.css";

class ViewItems extends Component {
  state = {
    data: {}
  };
  componentDidMount() {
    axios
      .get(
        "https://web-shop-00.firebaseio.com/short-details/-LkiyEvGXFJGRvcQIRXr.json"
      )
      .then(response => {
        this.setState({ data: response.data });
      })
      .catch(e => {
        console.log(e);
      });
  }

  onClickedProduct(key) {
    this.props.history.push({
      pathname: "/product/" + key,
      state: { key }
    });
  }

  render() {
    return (
      <div className="ViewItems">
        <Filter />
        {this.state.data ? (
          <ShortDetailsView
            clicked={key => this.onClickedProduct(key)}
            details={this.state.data}
          />
        ) : null}
      </div>
    );
  }
}

export default ViewItems;
