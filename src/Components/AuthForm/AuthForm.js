import React from "react";
import Button from "../UI/Button/Button";
import Input from "../UI/Input/Input";

import "./AuthForm.css";

const authForm = props => {
  return (
    <div className="Auth-Form">
      <h2>{props.type}</h2>
      <form onSubmit={e => props.submit(e)}>
        <Input
          value={props.value}
          elementType="Input"
          placeholder="E-mail"
          type="email"
          onChange={e => props.change(e, "email")}
        />
        <Input
          value={props.value}
          elementType="Input"
          placeholder="Password"
          type="password"
          onChange={e => props.change(e, "password")}
        />
        <div className="OrderBtn">
          <Button type="Success" click={e => props.submit(e)}>
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default authForm;
