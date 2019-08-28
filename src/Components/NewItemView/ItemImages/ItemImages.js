import React from "react";

import Input from "../../UI/Input/Input";

import "./ItemImages.css";

const itemImage = props => {
  let frontImg = null;
  let allImages = [];

  if (props.img) {
    frontImg = <img className="FrontImage" src={props.img} alt="Front" />;

    props.allImages.forEach((img, i) => {
      allImages.push(
        <div className="EachImageContainer" key={i}>
          <p className="RemoveItem" onClick={() => props.removeItem(i)}>
            X
          </p>
          <img
            className="AllImages"
            src={img}
            alt="Other"
            key={i}
            onClick={() => props.changeImage(i)}
          />
        </div>
      );
    });
  }
  let noImageView = null;

  if (allImages.length < 1) {
    noImageView = (
      <div className="NoImg">
        <p>Insert image</p>
      </div>
    );
  }

  return (
    <div className="ImageContainer">
      <Input elementType="input" type="file" onChange={props.onSelect} />
      {frontImg}
      {noImageView}
      {allImages}
    </div>
  );
};

export default itemImage;
