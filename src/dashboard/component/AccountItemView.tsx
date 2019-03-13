import React, { Component } from "react";

import Account from "../../model/account/Account";

interface AccountItemViewProps {
  index: number;
  account: Account;
  onDeleteAccount: (index: number) => void;
}

class AccountItemView extends Component<AccountItemViewProps, {}> {
  render() {
    const { account, index } = this.props;
    return (
      <div>
        <div>{index + 1}</div>
        <div>
          <span>수입:</span>
          <span>{account.getTotalIncome()}</span>
        </div>
        <div>
          <span>지출:</span>
          <span>{account.getTotalSpending()}</span>
        </div>
        <div onClick={() => this.props.onDeleteAccount(index)}>통장제거</div>
      </div>
    );
  }
}

export default AccountItemView;
