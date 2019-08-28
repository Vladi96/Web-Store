import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import AddNewItem from "../../../Components/AddNewItem/AddNewItem";
import Hoc from "../../../Hoc/Hoc";
import ViewItems from "../../ViewItems/ViewItems";

class ControlPanel extends Component {
  state = {};

  render() {
    return (
      <Hoc>
        <Switch>
          <Route exact={true} path="/dashboard/add" component={AddNewItem} />
          <Route exact={true} path="/dashboard/" component={ViewItems} />
        </Switch>
      </Hoc>
    );
  }
}

export default ControlPanel;
