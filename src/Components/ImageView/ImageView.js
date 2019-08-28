import React, { Component } from "react";
import "./ImageView.css";

class ImageView extends Component {
  state = {
    firstimageIndex: 0,
    arrowImages: {
      showLeftArrow: false,
      showRightArrow: this.props.images.length > 4
    },
    slideImages: {
      start: 0,
      end: this.props.images.length < 4 ? this.props.images.length : 4
    }
  };

  onMouseHoverHandler(index) {
    this.setState({ firstimageIndex: index });
  }

  changeImagesArrowHandler(side) {
    let imgLength = this.props.images.length;
    let start = this.state.slideImages.start;
    let end = this.state.slideImages.end;
    let showRightArrow = true;
    let showLeftArrow = true;

    if (side === "right") {
      start += 2;
      end += 2;
      if (end > imgLength) {
        end = imgLength;
        start = imgLength - 4;
        showRightArrow = false;
        showLeftArrow = true;
      }
      this.setState({
        slideImages: {
          start,
          end
        },
        arrowImages: { showRightArrow, showLeftArrow }
      });
    } else if (side === "left") {
      start -= 2;
      end -= 2;
      if (start < 1) {
        start = 0;
        end = 4;
        showRightArrow = true;
        showLeftArrow = false;
      }
      this.setState({
        slideImages: {
          start,
          end
        },
        arrowImages: { showRightArrow, showLeftArrow }
      });
    }
  }

  render() {
    let img = [],
      firstImg = "";

    this.props.images.forEach((element, index) => {
      img.push(
        <img
          onMouseEnter={() => this.onMouseHoverHandler(index)}
          key={index}
          alt="Product"
          src={element}
          className="ProductHeader-Images-Image"
        />
      );
    });

    firstImg = (
      <img alt="Product" src={this.props.images[this.state.firstimageIndex]} />
    );

    return (
      <div className="ProductHeader-ImageContainer">
        <div className="ProductHeader-FirstImg">{firstImg}</div>
        <div className="ProductHeader-Images">
          <div
            className={
              this.state.arrowImages.showLeftArrow ? "Arrow LeftArrow" : null
            }
            onClick={() => this.changeImagesArrowHandler("left")}
          />
          {img.slice(this.state.slideImages.start, this.state.slideImages.end)}
          <div
            className={
              this.state.arrowImages.showRightArrow ? "Arrow RightArrow" : null
            }
            onClick={() => this.changeImagesArrowHandler("right")}
            disabled={!this.state.arrowImages.showRightArrow}
          />
        </div>
      </div>
    );
  }
}

export default ImageView;
