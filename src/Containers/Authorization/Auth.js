import React, { Component } from "react";
import axios from "axios";
import AuthForm from "../../Components/AuthForm/AuthForm";

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
    ValidFrom: false
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
        console.log(res.data);
      })
      .catch(e => {
        console.log(e);
      });
  }
  render() {
    console.log(this.state.form);
    return (
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
    );
  }
}

export default Auth;
