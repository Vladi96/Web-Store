import React, { Component } from "react";
import axios from "axios";

import ItemImages from "./ItemImages/ItemImages";
import ItemInfo from "./ItemInfo/ItemInfo";

import "./NewItemView.css";

class ViewItem extends Component {
  state = {
    images: [],
    imagePreview: "",
    inputsValue: {
      productName: this.prepareControl("product name", "string", 4),
      price: this.prepareControl("price", "number", 2),
      quantity: this.prepareControl("quantity", "number", 1),
      specifications: true,
      productBrand: this.prepareControl("product brand", "string", 1),
      screenSize: this.prepareControl("screen size", "string", 2),
      storageType: this.prepareControl("storage type", "string", 2),
      screenResolution: this.prepareControl("screen resolution", "string", 4),
      touchScreen: this.prepareControl("touch screen", "string", 2),
      totalStorageCapacity: this.prepareControl(
        "total storage capacity",
        "string",
        3
      ),
      systemMemory: this.prepareControl("system memory", "string", 1),
      processorBrand: this.prepareControl("processor brand", "string", 3),
      processorModel: this.prepareControl("processor model", "string", 4),
      batteryLife: this.prepareControl("battery life", "string", 1),
      productWeight: this.prepareControl("product weigth", "string", 2)
    },
    validForm: false
  };

  prepareControl(placeholder, type, length) {
    let obj = {
      value: "",
      placeholder,
      rules: {
        required: true,
        minLength: length,
        type
      },
      isValid: false
    };

    return obj;
  }

  onSelectImageHandler(event) {
    event.preventDefault();

    let file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onloadend = () => {
        let allImages = [...this.state.images];

        allImages.push(reader.result);
        this.setState({ imagePreview: reader.result, images: allImages });
      };
    }
  }

  changeFrondImageHandler(index) {
    const images = [...this.state.images];
    const frondImage = images.splice(index, 1);
    this.setState({ imagePreview: frondImage[0] });
  }

  removeItemHandler(index) {
    let images = [...this.state.images];
    let removedImg = images.splice(index, 1);
    let imagePreview = this.state.imagePreview;

    if (imagePreview === removedImg[0]) {
      imagePreview = images[0];
    }

    this.setState({ imagePreview: imagePreview, images });
  }

  showInputHandler(key) {
    let showInputs = { ...this.state.showInputs };
    showInputs[key] = !showInputs[key];

    this.setState({ showInputs });
  }

  onChangeInputHandler(event, key) {
    const inputsValue = { ...this.state.inputsValue };
    let value = event.target.value;

    if (inputsValue[key].rules.type === "number") {
      if (/^\d*\.{1}$/.test(value)) {
        if (inputsValue[key].placeholder === "quantity") {
          value = Number.parseInt(value);
        }

        inputsValue[key].value = value;
        this.setState({ inputsValue });
      } else if (/^\d*\.?\d{1,2}$/.test(value) || value.length < 1) {
        value = Number(value) || 0;

        inputsValue[key].value = value;
        inputsValue[key].isValid = true;

        this.setState({ inputsValue });
      }
    } else {
      value = value !== "" ? value[0].toUpperCase() + value.slice(1) : "";
      inputsValue[key].value = value;
      this.setState({ inputsValue });
    }
    this.checkValidityHandler(key);
  }

  checkValidityHandler(key) {
    const rouls = { ...this.state.inputsValue[key].rules };
    let value = this.state.inputsValue[key].value;
    let isValid = true;

    value = value.toString();

    if (rouls.required && isValid) {
      isValid = value.trim() !== "" ? true : false;
    }
    if (rouls.minLength > value.trim().length && isValid) {
      isValid = false;
    }
    const inputsValue = { ...this.state.inputsValue };
    inputsValue[key].isValid = isValid;

    this.setState({ inputsValue });
  }

  checkValidityForm() {
    // let validForm = true;
    const stateObj = { ...this.state.inputsValue };

    for (const key in stateObj) {
      console.log(stateObj[key].isValid);
    }
  }

  onSubmitHandler(e) {
    e.preventDefault();
    this.checkValidityForm();
    const values = { ...this.state.inputsValue };
    const data = {};
    const nestedObj = {};
    let index = 10;

    for (const key in values) {
      if (key !== "specifications") {
        nestedObj[index + key] = values[key].value;
        data["productData"] = nestedObj;
        index++;
      }
    }

    data["images"] = [...this.state.images];

    axios
      .post("https://web-shop-00.firebaseio.com/product.json", data)
      .then(response => {
        // console.log(this.state.inputsValue);
        // console.log(response);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    return (
      <div className="ViewItem">
        <ItemImages
          changeImage={index => this.changeFrondImageHandler(index)}
          removeItem={index => this.removeItemHandler(index)}
          allImages={this.state.images}
          img={this.state.imagePreview}
          onSelect={e => this.onSelectImageHandler(e)}
        />
        <ItemInfo
          clicked={e => this.onSubmitHandler(e)}
          inputsValue={this.state.inputsValue}
          onChangeInput={(e, key) => this.onChangeInputHandler(e, key)}
          showInputs={this.state.showInputs}
          toShowInput={key => this.showInputHandler(key)}
        />
      </div>
    );
  }
}

export default ViewItem;
