import React, { Component } from "react";
import axios from "axios";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";

import Header from "./Containers/Header/Header";
import ControlAdminPanel from "./Containers/Admin/ControlPanel/ControlPanel";
import ViewItems from "./Containers/ViewItems/ViewItems";
import Product from "./Containers/Product/Product";
import Account from "./Containers/Account/Account";

import "./App.css";

class App extends Component {
  componentDidMount() {
    if (localStorage.token) {
      axios
        .post(
          "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyBm1TTJBHwknOYmhQgOjt_HhlWO31cYfic",
          {
            idToken: localStorage.token
          }
        )
        .then(res => {
          this.props.logUser(
            localStorage.token,
            localStorage.localId,
            res.data.users[0].email
          );
        })
        .catch(error => {
          console.log(error.response);
        });
    }
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Switch>
          <Route path="/dashboard" component={ControlAdminPanel} />
          <Route path="/product" component={Product} />
          <Route path="/account" component={Account} />
          <Route exact={true} path="/" component={ViewItems} />
        </Switch>
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => ({
  logUser: (token, localId, email) =>
    dispatch({
      type: "SIGN_IN_USER",
      data: { token, localId, email }
    })
});
export default connect(
  null,
  mapDispatchToProps
)(App);
