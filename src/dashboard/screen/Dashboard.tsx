import React, { Component } from "react";

import Account from "../../model/account/Account";
import User from "../../model/user/User";
import UserController from "../../controller/UserController";

// view
import SummaryView from "../component/SummaryView";
import AccountsView from "../component/AccountsView";
import ItemInputView from "../component/ItemInputView";

interface DashboardState {
  user: User;
  selAccountIndex: number;
}

class Dashboard extends Component<{}, DashboardState> {
  constructor(props) {
    super(props);
    this.state = {
      user: new User(),
      selAccount: -1
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
    const { user, selAccountIndex } = this.state;
    console.log();
    return (
      <div>
        <SummaryView user={user} />
        <AccountsView
          accounts={user.accounts}
          onClickCreateAccount={this.onClickCreateAccount.bind(this)}
          onClickInput={this.onClickInput.bind(this)}
          onUpdateAccounts={this.onUpdateAccounts.bind(this)}
          onDeleteAccount={this.onDeleteAccount.bind(this)}
        />
        {selAccountIndex > -1 ? (
          <ItemInputView account={user.accounts[selAccountIndex]} />
        ) : null}
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

  private onDeleteAccount(index: number): void {
    const { user } = this.state;
    user.accounts.splice(index, 1);
    UserController.setUser(user);
  }

  private onClickInput(selAccountIndex: number): void {
    this.setState({ ...this.state, selAccountIndex });
  }
}

export default Dashboard;
