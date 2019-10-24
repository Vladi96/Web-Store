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
      product_name: this.prepareControl(
        "product name (DELL XPS 2IN1)",
        "string",
        4
      ),
      price: this.prepareControl("price (999)", "number", 2),
      quantity: this.prepareControl("quantity (10)", "number", 1),
      specifications: true,
      product_brand: this.prepareControl("product brand (Dell)", "string", 1),
      screen_size: this.prepareControl('screen size (15")', "string", 2),
      storage_type: this.prepareControl("storage type (SSD)", "string", 2),
      screen_resolution: this.prepareControl(
        "screen resolution (2560 x 1600 (Retina))",
        "string",
        4
      ),
      touch_screen: this.prepareControl("touch screen (Yes/No)", "string", 2),
      total_storage_capacity: this.prepareControl(
        "total storage capacity (512GB)",
        "string",
        3
      ),
      system_memory: this.prepareControl("system memory (8GB)", "string", 1),
      processor_brand: this.prepareControl(
        "processor brand (Intel)",
        "string",
        3
      ),
      processor_model: this.prepareControl(
        "processor model (Intel Core i5-9300H 9th Generation)",
        "string",
        4
      ),
      battery_life: this.prepareControl("battery life (10h)", "string", 1),
      product_weight: this.prepareControl("product weight (2kg)", "string", 2)
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
    // const stateObj = { ...this.state.inputsValue };
  }

  onSubmitHandler(e) {
    e.preventDefault();
    this.checkValidityForm();
    const values = { ...this.state.inputsValue };
    const data = {};
    const nestedObj = {};

    for (const key in values) {
      if (key !== "specifications") {
        nestedObj[key] = values[key].value;
        data["productData"] = nestedObj;
      }
    }
    data["images"] = [...this.state.images];

    let shortData = {
      image: data.images[0],
      productData: {
        brand: data.productData.brand,
        price: data.productData.price,
        processor_model: data.productData.processor_model,
        product_name: data.productData.product_name,
        screen_size: data.productData.screen_size,
        system_memory: data.productData.system_memory,
        total_storage_capacity: data.productData.total_storage_capacity
      }
    };

    axios
      .post("https://web-shop-00.firebaseio.com/product.json", data)
      .then(response => {
        if (response.status === 200) {
          axios
            .put(
              `https://web-shop-00.firebaseio.com/short-details/-LkiyEvGXFJGRvcQIRXr/${response.data.name}.json`,
              { ...shortData }
            )
            .then(res => {
              console.log(res.code);
            })
            .catch(err => console.log(err));
        }
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
