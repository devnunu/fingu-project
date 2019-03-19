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

class AccountItemView extends Component<
  AccountItemViewProps,
  AccountItemViewState
> {
  constructor(props) {
    super(props);
    this.state = {
      reveal: false
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
          [styles.animated]: this.state.reveal
        })}
        style={{ background: account.accountColor }}
      >
        {/* 상단 계좌 정보 */}
        <div className={styles.accountTopInfoBox}>
          <div className={styles.bankName}>나의 계좌 {index + 1}</div>
          <div className={styles.bankType}>일반 통장</div>
        </div>
        {/* 계좌 총 금액 */}
        <div className={styles.contentBox}>
          <div className={styles.totalAmount}>
            <span>
              {StringUtil.getCurrencyValue(
                account.getTotalIncome() + account.getTotalSpending()
              )}
            </span>
            &nbsp;원
          </div>
        </div>
        {/* 하단 버튼 */}
        <div className={styles.buttonBox}>
          <div
            className={styles.deleteButton}
            onClick={() => this.props.onDeleteAccount(index)}
          >
            삭제
          </div>
          <div className={styles.selectButton} onClick={() => null}>
            선택
          </div>
        </div>
      </div>
    );
  }
}

export default AccountItemView;
