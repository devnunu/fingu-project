import React, { Component, Fragment } from 'react';
import classNames from 'classnames';

// model
import Account from '../../model/account/Account';

// util
import StringUtil from 'common/utils/StringUtil';

// style
import styles from './AccountItemView.scss';

interface AccountItemViewProps {
  index: number;
  account: Account;
  selected: boolean;
  className?: string;
  onClickSelectAccount: (selAccountIndex) => void;
  onDeleteAccount: (index: number) => void;
}

class AccountItemView extends Component<AccountItemViewProps, {}> {
  render() {
    const { account, index, selected } = this.props;
    return (
      <div
        className={classNames(this.props.className, styles.container, {
          [styles.selected]: selected
        })}
        style={{ background: account.accountColor }}
      >
        {/* 상단 계좌 정보 */}
        <div className={styles.accountTopInfoBox}>
          <div className={styles.bankName}>{account.name}</div>
          <div className={styles.bankType}>일반 통장</div>
        </div>
        {/* 계좌 총 금액 */}
        <div className={styles.contentBox}>
          <div className={styles.totalAmount}>
            <span>
              {account.balance !== undefined
                ? StringUtil.getCurrencyValue(
                    account.balance + account.getTotalSpending()
                  )
                : '-'}
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
          <div
            className={styles.selectButton}
            onClick={() => this.props.onClickSelectAccount(index)}
          >
            선택
          </div>
        </div>
      </div>
    );
  }
}

export default AccountItemView;
