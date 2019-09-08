import React from "react";
import Input from "../UI/Input/Input";
import Button from "../UI/Button/Button";

import "./AccountInfo.css";

const accountInfo = props => {
  const changePassword = (
    <div className="ChangePasswordField">
      <span>New password</span>
      <Input
        elementType="input"
        type="password"
        value={props.values.newPassword}
        onChange={e => props.onChangePassword(e, "newPassword")}
      ></Input>
      <span>Confirm password</span>
      <Input
        elementType="input"
        type="password"
        value={props.values.confirmPassword}
        onChange={e => props.onChangePassword(e, "confirmPassword")}
      ></Input>
      {props.passwordHelpMessage.value !== "" ? (
        <p
          className={[
            "HelpPasswordMessage",
            props.passwordHelpMessage.type
          ].join(" ")}
        >
          {props.passwordHelpMessage.value}
        </p>
      ) : null}
      <Button type="Confirm" click={props.changePassword}>
        Confirm
      </Button>
    </div>
  );
  const deleteAccount = (
    <div className="DeleteAccount">
      <div className="Box">
        <p>Are you sure you want to delete your account?</p>
        <Button type="Confirm" click={props.showDeleteAlert}>
          Cencel
        </Button>
        <Button type="Danger" click={props.confirmDeleteAccount}>
          Delete My Account
        </Button>
      </div>
    </div>
  );
  return (
    <div className="AccountInfo">
      <h3>User Info</h3>
      <p className="EmailInfo">
        Email: <span>{props.email}</span>
      </p>
      <Button type="Change" click={props.togleChangePassword}>
        Change Password
      </Button>

      <Button type="Change" click={props.log_Out}>
        Log Out
      </Button>
      <Button type="Danger" click={props.showDeleteAlert}>
        Delete My account!
      </Button>
      {props.shouldChangePassword ? changePassword : null}

      {props.deleteAlert ? deleteAccount : null}
    </div>
  );
};

export default accountInfo;
