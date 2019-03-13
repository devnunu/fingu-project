import React, { Component } from "react";

import User from "../../model/user/User";
import UserController from "../../controller/UserController";

// view
import SummaryView from "../component/SummaryView.tsx";

interface DashboardState {
  user: User;
}

class Dashboard extends Component<{}, DashboardState> {
  constructor(props) {
    super(props);
    this.state = {
      user: new User()
    };
  }

  componentWillMount() {
    UserController.setUserListner(this.onFetchUser.bind(this));
    UserController.notifyUserListner();
  }

  componentWillUnmount() {
    UserController.deleteUserListner(this.onFetchUser);
  }

  onFetchUser(user: User) {
    this.setState({ ...this.state, user });
  }

  render() {
    const { user } = this.state;
    return (
      <div>
        <SummaryView user={user} />
      </div>
    );
  }
}

export default Dashboard;
