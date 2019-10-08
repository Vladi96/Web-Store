import React, { Component } from "react";
import { connect } from "react-redux";

import axios from "axios";
import AuthForm from "../../Components/AuthForm/AuthForm";
import Hoc from "../../Hoc/Hoc";

import "./Auth.css";

class Auth extends Component {
  state = {
    form: {
      email: {
        value: "",
        isValid: false
      },
      password: {
        value: "",
        isValid: false
      }
    },
    ValidFrom: false,
    helpMessage: ""
  };

  changeHandler(event, type) {
    const form = { ...this.state.form };
    form[type].value = event.target.value.trim();
    this.setState({ form: { ...form } });
  }

  onSubmitHandler(e, type) {
    e.preventDefault();
    const data = {
      email: this.state.form.email.value,
      password: this.state.form.password.value,
      returnSecureToken: true
    };

    let url =
      "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyBm1TTJBHwknOYmhQgOjt_HhlWO31cYfic";

    if (type === "SignIn") {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBm1TTJBHwknOYmhQgOjt_HhlWO31cYfic";
    }

    axios
      .post(url, data)
      .then(res => {
        this.props.logUser(res.data.idToken, res.data.localId, data.email);

        localStorage.setItem("expiresIn", res.data.expiresIn);
        localStorage.token = res.data.idToken;
        localStorage.localId = res.data.localId;
        localStorage.setItem("refreshToken", res.data.refreshToken);
        this.props.history.goBack();
      })
      .catch(error => {
        switch (error.response.data.error.message) {
          case "EMAIL_NOT_FOUND":
            this.setState({
              helpMessage: "Unfortunately, we can't find your account!"
            });
            break;
          case "INVALID_PASSWORD":
            this.setState({ helpMessage: "Wrong password!" });
            break;
          case "EMAIL_EXISTS":
            this.setState({
              helpMessage: "This email address already exists!"
            });
            break;
          case "INVALID_EMAIL":
            this.setState({
              helpMessage: "Please enter a valid email address!"
            });
            break;
          case "MISSING_PASSWORD":
            this.setState({
              helpMessage: "Please enter a password!"
            });
            break;
          case "WEAK_PASSWORD : Password should be at least 6 characters":
            this.setState({
              helpMessage: "Password should be at least 6 characters!"
            });
            break;
          default:
            break;
        }
      });
  }
  render() {
    return (
      <Hoc>
        <div className="Auth">
          <AuthForm
            type="Sign In"
            submit={e => this.onSubmitHandler(e, "SignIn")}
            change={(e, type) => this.changeHandler(e, type)}
          />
          <AuthForm
            type="Create New Account"
            submit={e => this.onSubmitHandler(e)}
            change={(e, type) => this.changeHandler(e, type)}
          />
        </div>
        {this.state.helpMessage !== "" ? (
          <p className="HelpMessage">{this.state.helpMessage}</p>
        ) : null}
      </Hoc>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  logOut: expiresIn =>
    dispatch({
      type: "LOG_OUT_USER",
      data: {
        expiresIn
      }
    }),
  logUser: (token, localId, email) =>
    dispatch({
      type: "SIGN_IN_USER",
      data: { token, localId, email }
    })
});

export default connect(
  null,
  mapDispatchToProps
)(Auth);
