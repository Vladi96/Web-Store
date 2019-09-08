import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";

import ShortDetailsView from "../../Components/ShortDetailsView/ShortDetailsView";
import Filter from "../../Components/FilterProducts/FilterProducts";

import "./ViewItems.css";

class ViewItems extends Component {
  state = {
    data: {},
    haveData: false
  };
  _isMounted = false;

  componentDidMount() {
    this._isMounted = true;
    axios
      .get(
        "https://web-shop-00.firebaseio.com/short-details/-LkiyEvGXFJGRvcQIRXr.json"
      )
      .then(response => {
        if (this._isMounted) {
          this.setState({ data: response.data }, () => {
            this.setState({ haveData: true });
          });
        }
      })
      .catch(e => {
        console.log(e);
      });
  }
  componentWillUnmount() {
    this._isMounted = false;
  }

  onClickedProduct(key) {
    this.props.history.push({
      pathname: "/product/" + key,
      state: { key }
    });
  }

  filterData() {
    let filtredData = { ...this.state.data };

    let result = {};

    //EACH OTHER FILTER
    for (let [filter_key, [...filter_value]] of Object.entries(
      this.props.filters
    )) {
      filter_key = filter_key
        .toLowerCase()
        .split("-")
        .join("_");
      filter_value = filter_value.map(element => {
        //MAKING FILTER TO BE A REGEX
        return RegExp(
          element
            .toLowerCase()
            .split("_")
            .join(" ")
        );
      });

      //EACH PRODUCT
      for (const [data_key, data_value] of Object.entries(filtredData)) {
        //TEST DATA WITH FILTER

        // eslint-disable-next-line no-loop-func
        filter_value.forEach(element => {
          if (element.test(data_value.productData[filter_key].toLowerCase())) {
            result[data_key] = data_value;
          } else if (Object.keys(result).length < 1) {
            filtredData = { ...result };
          }
        });
      }

      filtredData =
        Object.keys(result).length > 0 ? { ...result } : { ...filtredData };
      result = {};
    }
    return { ...filtredData };
  }

  render() {
    const data = this.filterData();

    return (
      <div className="ViewItems">
        <Filter />
        {this.state.haveData ? (
          <ShortDetailsView
            clicked={key => this.onClickedProduct(key)}
            data={data}
          />
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  filters: state.filters
});

export default connect(mapStateToProps)(ViewItems);
