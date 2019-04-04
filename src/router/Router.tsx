import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';

import User from '../model/user/User';
import UserController from '../controller/UserController';

// view
import Nav from '../nav/component/Nav';
import Dashboard from 'dashboard/screen/Dashboard';
import BasicInfo from 'basicinfo/screen/BasicInfo';
import Analysis from 'analysis/screen/Analysis';

interface FinguRouterState {
  user: User;
}

class FinguRouter extends Component<{}, FinguRouterState> {
  constructor(props) {
    super(props);
    this.state = {
      user: new User(),
    };
  }

  componentWillMount() {
    UserController.setUserListner(this.onFetchUser.bind(this));
  }

  componentWillUnmount() {
    UserController.deleteUserListner(this.onFetchUser);
  }

  render() {
    return this.state.user.dataSubmited ? this.privateRouter() : this.publicRouter();
  }

  private publicRouter() {
    return (
      <BrowserRouter>
        <Route path="/" component={BasicInfo} />
      </BrowserRouter>
    );
  }

  private privateRouter() {
    return (
      <BrowserRouter>
        <div>
          <Nav />
          <Route path="/" exact component={Dashboard} />
          <Route path="/analysis" component={Analysis} />
        </div>
      </BrowserRouter>
    );
  }

  private onFetchUser(user: User) {
    this.setState({ ...this.state, user });
  }
}

export default FinguRouter;
