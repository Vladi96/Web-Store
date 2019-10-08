import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";

import Auth from "../Authorization/Auth";
import Hoc from "../../Hoc/Hoc";
import UserOrders from "../../Components/UserOrders/UserOrders";
import AccountInfo from "../../Components/AccountInfo/AccountInfo";

class Account extends Component {
  state = {
    passwordValues: {
      newPassword: "",
      confirmPassword: ""
    },
    shouldChangePassword: false,
    passwordChangeHelpMessage: { value: "", type: "" },
    deleteAlert: false,
    ordersData: {}
  };

  componentDidMount() {
    if (this.props.token) {
      axios
        .get(
          "https://web-shop-00.firebaseio.com/orders.json?auth=" +
            this.props.token +
            `&orderBy="userId"&equalTo="` +
            this.props.userId +
            `"`
        )
        .then(res => {
          this.setState({ ordersData: res.data });
        });
    }
  }

  shouldChangePasswordHandler() {
    this.setState({ shouldChangePassword: !this.state.shouldChangePassword });
  }

  onChangePasswordHandler(e, type) {
    const updatedState = { ...this.state };
    updatedState.passwordValues[type] = e.target.value.trim();
    this.setState({ ...updatedState });
  }

  changePasswordHandler() {
    const password = this.state.passwordValues.newPassword;
    const confirmPassword = this.state.passwordValues.confirmPassword;
    if (password !== confirmPassword) {
      this.setState({
        passwordChangeHelpMessage: {
          value: "These passwords are not identical. Try again!",
          type: "Error"
        }
      });
    } else if (password.length < 6) {
      this.setState({
        passwordChangeHelpMessage: {
          value: "Use 6 characters or more for you are password!",
          type: "Error"
        }
      });
    } else {
      axios
        .post(
          "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBm1TTJBHwknOYmhQgOjt_HhlWO31cYfic",
          {
            idToken: this.props.token,
            password: this.state.passwordValues.newPassword,
            returnSecureToken: true
          }
        )
        .then(res => {
          this.props.signIn(res.data.localId, res.data.idToken, res.data.email);

          this.setState({
            passwordValues: {
              newPassword: "",
              confirmPassword: ""
            }
          });

          localStorage.token = res.data.idToken;
          localStorage.expiresIn = res.data.expiresIn;
          localStorage.refreshToken = res.data.refreshToken;
          localStorage.localId = res.data.localId;

          this.setState({
            passwordChangeHelpMessage: {
              value: "Success! Your Password has been changed!",
              type: "Success"
            }
          });
        })
        .catch(error => {
          this.setState({
            passwordChangeHelpMessage: {
              value: "Somethings wrong!",
              type: "Error"
            }
          });
        });
    }
  }

  deleteAccountHandler() {
    axios
      .post(
        "https://identitytoolkit.googleapis.com/v1/accounts:delete?key=AIzaSyBm1TTJBHwknOYmhQgOjt_HhlWO31cYfic",
        { idToken: this.props.token }
      )
      .then(res => {
        this.props.history.push("/");
        this.props.logOut();
      });
  }

  render() {
    return (
      <Hoc>
        {localStorage.token ? (
          <>
            <AccountInfo
              passwordHelpMessage={this.state.passwordChangeHelpMessage}
              values={{ ...this.state.passwordValues }}
              onChangePassword={(e, type) =>
                this.onChangePasswordHandler(e, type)
              }
              changePassword={() => this.changePasswordHandler()}
              log_Out={() => this.props.logOut()}
              email={this.props.email}
              togleChangePassword={() => this.shouldChangePasswordHandler()}
              shouldChangePassword={this.state.shouldChangePassword}
              deleteAlert={this.state.deleteAlert}
              showDeleteAlert={() =>
                this.setState({ deleteAlert: !this.state.deleteAlert })
              }
              confirmDeleteAccount={() => this.deleteAccountHandler()}
            ></AccountInfo>
            <UserOrders data={this.state.ordersData} />
          </>
        ) : (
          <Auth {...this.props}></Auth>
        )}
      </Hoc>
    );
  }
}

const mapStateToProps = state => ({
  email: state.email,
  token: state.token,
  userId: state.userId
});

const mapDispatchToProps = dispatch => ({
  logOut: () => dispatch({ type: "LOG_OUT_USER" }),
  signIn: (localId, token, email) =>
    dispatch({
      type: "SIGN_IN_USER",
      data: {
        localId,
        token,
        email
      }
    })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Account);
