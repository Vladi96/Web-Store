import React from "react";
import styled from "styled-components";
import "./UnorderedList.css";

const unorderedList = props => {
  const Div = styled.div`
    font-size: 16px;
    color: #fff;
    width: 110px;
    text-align: left;
    margin: 5px;
  `;

  const Ul = styled.ul`
    list-style: none;
  `;

  const title = <h5 className="List-Title">{props.value.shift()}</h5>;
  const li = [];
  props.value.forEach((element, index) => {
    li.push(
      <li key={index}>
        <p className="List-Item"> {element}</p>
      </li>
    );
  });

  return (
    <Div>
      {title}
      <Ul>{li}</Ul>
    </Div>
  );
};

export default unorderedList;
