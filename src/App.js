import React from "react";
import { Route, Switch } from "react-router-dom";
import Header from "./Containers/Header/Header";
import ControlAdminPanel from "./Containers/Admin/ControlPanel/ControlPanel";
import ViewItems from "./Containers/ViewItems/ViewItems";
import Product from "./Containers/Product/Product";
import Auth from "./Containers/Authorization/Auth";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route path="/dashboard" component={ControlAdminPanel} />
        <Route path="/product" component={Product} />
        <Route path="/acount" component={Auth} />
        <Route exact={true} path="/" component={ViewItems} />
      </Switch>
    </div>
  );
}

export default App;
