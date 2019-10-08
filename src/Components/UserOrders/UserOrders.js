import React, { useState } from "react";

import EachDetailsView from "../ShortDetailsView/EachDetailsView/EachDetailsView";

import "./UserOrders.css";

const UserOrders = props => {
  const [productKey, setKey] = useState(null);
  let allOrders = [];

  for (const key in props.data) {
    allOrders.push(
      <div
        key={key}
        className="OrdersContainer-Order"
        onClick={() => (key === productKey ? setKey(null) : setKey(key))}
      >
        <ul>
          <li>Date: {props.data[key].date}</li>
          <li>
            Number of items: {Object.keys(props.data[key].details).length}
          </li>
          <li>
            Total price: $
            {new Intl.NumberFormat("en-IN").format(props.data[key].totalPrice)}
          </li>
        </ul>
      </div>
    );
  }

  let viewOrder = productKey ? (
    <EachDetailsView
      details={props.data[productKey].details}
      type="Order"
    ></EachDetailsView>
  ) : null;

  if (!productKey && allOrders.length < 1) {
    viewOrder = <p>You don't have any orders yet!</p>;
  }

  return (
    <div className="OrdersContainer">
      <h1>My orders:</h1>
      <div className="OrdersContainer-Orders">{allOrders}</div>
      <div className="OrdersContainer-ShowOrder">{viewOrder}</div>
    </div>
  );
};

export default UserOrders;
