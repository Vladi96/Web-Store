import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";

import ShortDetailsView from "../../Components/ShortDetailsView/ShortDetailsView";
import FilterProducts from "../../Components/FilterProducts/FilterProducts";
import Footer from "../../Containers/Footer/Footer";

import "./ViewItems.css";

class ViewItems extends Component {
  state = {
    data: {},
    haveData: false
  };
  _isMounted = false;

  componentWillMount() {
    this.props.removeAllFilters();
  }

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
      pathname: "/product/" + key
    });
  }

  filterData() {
    let filteredData = { ...this.state.data };
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
      for (const [data_key, data_value] of Object.entries(filteredData)) {
        // eslint-disable-next-line no-loop-func
        filter_value.forEach(element => {
          if (element.test(data_value.productData[filter_key].toLowerCase())) {
            result[data_key] = data_value;
          } else if (Object.keys(result).length < 1) {
            filteredData = { ...result };
          }
        });
      }

      filteredData =
        Object.keys(result).length > 0 ? { ...result } : { ...filteredData };
      result = {};
    }
    return { ...filteredData };
  }

  orderClickHandler(id, price) {
    axios
      .get(
        `https://web-shop-00.firebaseio.com/short-details/-LkiyEvGXFJGRvcQIRXr/${id}.json`
      )
      .then(res => {
        this.props.purchaseProduct(id, price, res.data);
      })
      .catch(e => console.log(e));
  }

  render() {
    const data = this.filterData();
    return (
      <>
        <div className="ViewItems">
          <div className="Filter-Container">
            <FilterProducts />
          </div>
          {this.state.haveData ? (
            <ShortDetailsView
              orderClick={id =>
                this.orderClickHandler(
                  id,
                  this.state.data[id].productData.price
                )
              }
              viewList={true}
              clicked={key => this.onClickedProduct(key)}
              details={data}
            />
          ) : null}
        </div>
        <Footer />
      </>
    );
  }
}

const mapStateToProps = state => ({
  filters: state.filters
});

const mapDispatchToProps = dispatch => ({
  purchaseProduct: (id, price, productData) =>
    dispatch({
      type: "MAKE_PURCHASE",
      data: { id, price, productData }
    }),
  removeAllFilters: () => dispatch({ type: "REMOVE_ALL_FILTERS" })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewItems);
