import React from "react";
import styled, { css } from "styled-components";

const Image = styled.img`
  max-width: 140px;
  max-height: 100px;
  margin: auto;
  cursor: pointer;

  ${props =>
    props.primary &&
    css`
      max-height: 80%;
      max-width: 80%;
    `}

  @media screen and (max-width: 720px) {
    ${props =>
      !props.primary &&
      css`
        max-width: 90px;
        max-height: 60px;
      `}
  }

  @media screen and (max-width: 1060px) {
    ${props =>
      !props.primary &&
      css`
        max-width: 100px;
        max-height: 80px;
      `}
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
    ${props =>
      !props.primary &&
      css`
        height: 70px;
      `}
    ${props =>
      props.purchase &&
      css`
        width: 180px;
      `}
  }

  @media screen and (max-width: 1060px) {
    ${props =>
      !props.primary &&
      css`
        height: 90px;
      `}
  }

  ${props =>
    props.primary &&
    css`
      width: 100%;
      height: 100%;
    `}

  ${props =>
    props.purchase &&
    css`
      width: 260px;
      align-self: center;
    `}
`;

const img = props => {
  return (
    <ContainerImg primary={props.primary} purchase={props.type}>
      <Image
        primary={props.primary}
        onClick={props.onClick}
        src={props.src}
        alt={props.alt}
      ></Image>
    </ContainerImg>
  );
};

export default img;
