import React, { Component } from "react";

import Account from "../../model/account/Account";

// view
import AccountItemView from "./AccountItemView";

interface AccountsViewProps {
  accounts: Account[];
  onClickCreateAccount: () => void;
  onUpdateAccounts: (accounts: Account[]) => void;
  onDeleteAccount: (index: number) => void;
}

class AccountsView extends Component<AccountsViewProps, {}> {
  render() {
    const { accounts } = this.props;
    return (
      <div>
        <span onClick={this.props.onClickCreateAccount}>계좌 추가 +</span>
        {accounts.length === 0 ? (
          <div>계좌없음</div>
        ) : (
          this.renderAccountItem(accounts)
        )}
      </div>
    );
  }

  renderAccountItem(accounts) {
    return accounts.map((account, index) => (
      <AccountItemView
        key={index}
        index={index}
        account={account}
        onDeleteAccount={this.props.onDeleteAccount}
      />
    ));
  }
}

export default AccountsView;
