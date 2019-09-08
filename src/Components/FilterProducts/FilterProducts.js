import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import OptionsContainer from "./OptionsContainer/OptionsContainer";
import { connect } from "react-redux";

import "./FilterProducts.css";

class Filter extends Component {
  componentDidMount() {
    let searchArray = this.props.location.search.split("?");
    searchArray = searchArray.filter(el => el !== "");
    searchArray.forEach(element => {
      const array = element.split("=");
      const key = array[0];
      const values = array[1].split("&");
      const obj = {};
      obj[key] = values;

      this.props.createFilter(obj);
    });
  }

  componentWillUnmount() {
    this.props.removeAllFilters();
  }

  onSelectItem(item, name) {
    let toSearch = this.props.location.search;
    const indexOfItem = toSearch.indexOf(item);
    name = name.replace(/"/, "");

    const indexOfName = toSearch.indexOf(name);
    const obj = {};

    if (indexOfItem === -1) {
      toSearch += "?" + item + "=" + name;

      obj[item] = [name];
      this.props.createFilter(obj);
    } else if (indexOfName === -1) {
      toSearch = toSearch
        .split("?")
        .map(element => {
          const key = element.split("=")[0];

          if (key === item) {
            element += "&" + name;
            obj[item] = [name];
            this.props.createFilter(obj);
          }
          return element;
        })
        .join("?");
    } else if (indexOfName !== -1) {
      const objRemove = {};

      toSearch = toSearch.replace(name, "");
      toSearch = toSearch
        .split("?")
        .map(el => {
          let search = el.split("=");

          if (search[1] === "" || /^&*$/.test(search[1])) {
            el = "";
          }
          objRemove[item] = name;
          return el;
        })
        .join("?");
      this.props.removeFilter(objRemove);
    }

    toSearch = toSearch.replace(/\?+/g, "?");
    toSearch = toSearch.replace(/=&+/, "=");
    toSearch = toSearch.replace(/&+/, "&");
    toSearch = toSearch.replace(/&+\?/, "?");
    toSearch = toSearch.replace(/\?+$/, "");
    toSearch = toSearch.replace(/&+$/, "");

    this.props.history.push(toSearch);
  }

  render() {
    return (
      <div className="Filter">
        <OptionsContainer
          title="Brand"
          options={["Dell", "Apple", "Asus"]}
          clicked={(item, name) => this.onSelectItem(item, name)}
        />
        <OptionsContainer
          title="Screen Size"
          options={['13"', '14"', '15"']}
          clicked={(item, name) => this.onSelectItem(item, name)}
        />
        <OptionsContainer
          title="System Memory"
          options={["8GB", "16GB", "32GB"]}
          clicked={(item, name) => this.onSelectItem(item, name)}
        />
        <OptionsContainer
          title="Processor Model"
          options={["Intel Core i7", "Intel Core i5", "Intel Core i9"]}
          clicked={(item, name) => this.onSelectItem(item, name)}
        />
      </div>
    );
  }
}

const mapDispatchtoProps = dispatch => ({
  createFilter: data => {
    dispatch({ type: "ADD_FILTER", data });
  },
  removeFilter: data => {
    dispatch({ type: "REMOVE_FILTER", data });
  },
  removeAllFilters: () => dispatch({ type: "REMEVE_ALL_FILTERS" })
});

export default connect(
  null,
  mapDispatchtoProps
)(withRouter(Filter));
