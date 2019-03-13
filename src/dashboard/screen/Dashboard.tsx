import React, { Component } from "react";

import Account from "../../model/account/Account";
import User from "../../model/user/User";
import UserController from "../../controller/UserController";

// view
import SummaryView from "../component/SummaryView";
import AccountsView from "../component/AccountsView";

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
        <AccountsView
          accounts={user.accounts}
          onClickCreateAccount={this.onClickCreateAccount.bind(this)}
          onUpdateAccounts={this.onUpdateAccounts.bind(this)}
        />
      </div>
    );
  }

  private onClickCreateAccount(): void {
    const { user } = this.state;
    user.accounts.push(new Account());
    UserController.setUser(user);
  }

  private onUpdateAccounts(accounts: Account[]): void {
    const { user } = this.state;
    user.accounts = accounts;
    UserController.setUser(user);
  }
}

export default Dashboard;
