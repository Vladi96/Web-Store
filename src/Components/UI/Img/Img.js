import React from "react";
import styled from "styled-components";

const Image = styled.img`
  max-width: 140px;
  max-height: 100px;
  margin: auto;
  cursor: pointer;

  @media screen and (max-width: 720px) {
    max-width: 90px;
    max-height: 60px;
  }

  @media screen and (max-width: 1060px) {
    max-width: 100px;
    max-height: 80px;
  }

  @media screen and (min-width: 1000px) {
    transform: scale(1);
    transition: 0.4s ease-in-out;
    &:hover {
      transform: scale(1.2);
    }
  }
`;

const ContainerImg = styled.div`
  align-self: flex-end;
  height: 120px;
  @media screen and (max-width: 720px) {
    height: 70px;
  }

  @media screen and (max-width: 1060px) {
    height: 90px;
  }
`;

const img = props => {
  return (
    <ContainerImg>
      <Image onClick={props.onClick} src={props.src} alt={props.alt}></Image>
    </ContainerImg>
  );
};

export default img;
