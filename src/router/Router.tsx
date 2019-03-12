import React, { Component } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";

// view
import Dashboard from "../dashboard/Dashboard";

class FinguRouter extends Component<{}, {}> {
  render() {
    return (
      <BrowserRouter>
        <Route path="/" component={Dashboard} />
      </BrowserRouter>
    );
  }
}

export default FinguRouter;
