import React, { Component } from "react";

// import Input from "../UI/Input/Input";
// import Button from "../UI/Button/Button";
import ViewItem from "../NewItemView/NewItemView";

import "./AddNewItem.css";

class AddNewItem extends Component {
  state = {
    form: {
      title: this.mapingInputs("input", "Title"),
      brand: this.mapingInputs("input", "Brand"),
      model: this.mapingInputs("input", "Model"),
      price: this.mapingInputs("input", "Price")
    }
  };

  mapingInputs(type, placeholder) {
    return {
      type,
      placeholder,
      rools: {
        minLength: 3,
        required: true
      },
      valid: false
    };
  }

  render() {
    return (
      <div className="AddNewItem">
        <ViewItem />
      </div>
    );
  }
}

export default AddNewItem;
