import React, { Component } from "react";

import Account from "../../model/account/Account";

interface AccountsViewProps {
  accounts: Account[];
  onClickCreateAccount: () => void;
  onUpdateAccounts: (accounts: Account[]) => void;
}

class AccountsView extends Component<AccountsViewProps, {}> {
  render() {
    const { accounts } = this.props;
    return (
      <div>
        <span onClick={this.props.onClickCreateAccount}>계좌 추가 +</span>
        {accounts.length === 0 ? <div>계좌없음</div> : <div>계좌 있음</div>}
      </div>
    );
  }
}

export default AccountsView;
