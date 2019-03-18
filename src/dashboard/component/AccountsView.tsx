import * as React from 'react';
import { Component } from 'react';

import Account from '../../model/account/Account';

// view
import AccountItemView from './AccountItemView';
import Container from '../../common/component/container/Container';

import styles from './AccountsView.scss';

interface AccountsViewProps {
  accounts: Account[];
  onClickCreateAccount: () => void;
  onClickInput: (selAccountIndex) => void;
  onUpdateAccounts: (accounts: Account[]) => void;
  onDeleteAccount: (index: number) => void;
}

class AccountsView extends Component<AccountsViewProps, {}> {
  render() {
    const { accounts } = this.props;
    return (
      <Container className={styles.conatiner}>
        <div className={styles.topSection}>
          <div
            className={styles.buttonAddAccount}
            onClick={this.props.onClickCreateAccount}
          >
            계좌 추가 +
          </div>
        </div>
        {accounts.length === 0 ? (
          <div className={styles.emptyAccountBox}>
            앗 아직 계좌가 없군요!
            <br />
            우측 상단의 <span>계좌 추가</span>를 눌러주세요.
          </div>
        ) : (
          this.renderAccountItem(accounts)
        )}
      </Container>
    );
  }

  renderAccountItem(accounts) {
    return accounts.map((account, index) => (
      <AccountItemView
        key={index}
        index={index}
        account={account}
        onClickInput={this.props.onClickInput}
        onDeleteAccount={this.props.onDeleteAccount}
      />
    ));
  }
}

export default AccountsView;
