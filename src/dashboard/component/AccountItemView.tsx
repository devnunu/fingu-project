import React, { Component } from 'react';
import classNames from 'classnames';

import Account from '../../model/account/Account';

import StringUtil from 'common/utils/StringUtil';
import Button from '../../common/component/button/Button';

import styles from './AccountItemView.scss';

interface AccountItemViewProps {
  index: number;
  account: Account;
  className?: string;
  onClickInput: (selAccountIndex) => void;
  onDeleteAccount: (index: number) => void;
}

interface AccountItemViewState {
  reveal: boolean;
}

class AccountItemView extends Component<AccountItemViewProps, AccountItemViewState> {
  constructor(props) {
    super(props);
    this.state = {
      reveal: false,
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ ...this.state, reveal: true });
    }, 1);
  }

  render() {
    const { account, index } = this.props;
    return (
      <div
        className={classNames(this.props.className, styles.container, {
          [styles.animated]: this.state.reveal,
        })}
      >
        <div className={styles.accountLogo} style={{ background: account.accountColor }}>
          나의 계좌 {index + 1}
        </div>
        <div className={styles.contentBox}>
          <div>
            <span>수입</span>
            <span>{account.getTotalIncome()}</span>
          </div>
          <div>
            <span>지출</span>
            <span>{account.getTotalSpending()}</span>
          </div>
        </div>
        <div className={styles.buttonBox}>
          {/* <div onClick={() => this.props.onClickInput(index)}>내역 추가</div> */}
          <Button className={styles.deleteButton} onClick={() => this.props.onDeleteAccount(index)} text="삭제" />
          <Button onClick={undefined} text="자세히" />
        </div>
        <div className={styles.totalSummary}>
          총&nbsp;
          <text>{StringUtil.getCurrencyValue(account.getTotalIncome() + account.getTotalSpending())}</text>
          &nbsp;원
        </div>
      </div>
    );
  }
}

export default AccountItemView;
