import React from "react";
import "./FullProductDetails.css";

const fullProductDetails = props => {
  return (
    <div className="FullProductDetails">
      <h2>Specification on {props.data.product_name}</h2>
      <table>
        <tbody>
          <tr>
            <th>Product Name</th>
            <td>{props.data.product_name}</td>
          </tr>

          <tr>
            <th>Product Brand</th>
            <td>{props.data.product_brand}</td>
          </tr>

          <tr>
            <th>Processor Brand</th>
            <td>{props.data.processor_brand}</td>
          </tr>

          <tr>
            <th>Processor Model</th>
            <td>{props.data.processor_model}</td>
          </tr>

          <tr>
            <th>Screen Resolution</th>
            <td>{props.data.screen_resolution}</td>
          </tr>

          <tr>
            <th>Screen Size</th>
            <td>{props.data.screen_size}</td>
          </tr>

          <tr>
            <th>Touch Screen</th>
            <td>{props.data.touch_screen}</td>
          </tr>

          <tr>
            <th>Battery Life</th>
            <td>{props.data.battery_life}</td>
          </tr>

          <tr>
            <th>Product Weight</th>
            <td>{props.data.product_weight}</td>
          </tr>

          <tr>
            <th>Storage Type</th>
            <td>{props.data.storage_type}</td>
          </tr>

          <tr>
            <th>Total Storage Capacity</th>
            <td>{props.data.total_storage_capacity}</td>
          </tr>

          <tr>
            <th>System Memory</th>
            <td>{props.data.system_memory}</td>
          </tr>

          <tr>
            <th>Price</th>
            <td>${props.data.price}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
export default fullProductDetails;
