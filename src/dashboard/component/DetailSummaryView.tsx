import React, { Component } from 'react';
import classNames from 'classnames';

// model
import Account from 'model/account/Account';

// style
import styles from './DetailSummaryView.scss';

interface DetailSummaryViewProps {
  className?: string;
  account: Account;
}

class DetailSummaryView extends Component<DetailSummaryViewProps, {}> {
  render() {
    const { account } = this.props;
    return (
      <div className={classNames(styles.container, this.props.className)}>
        <div className={styles.title}>{account.name}</div>
        <div className={styles.incomeBox}>
          <div className={styles.incomeLabel}>초기 잔액</div>
          <div>{account.getTotalIncome()} 원</div>
        </div>
        <div className={styles.spendingBox}>
          <div className={styles.spendingLabel}>지출</div>
          <div>{account.getTotalSpending()} 원</div>
        </div>
        <div>
          <div>합계</div>
          <div>{account.getTotalIncome() - account.getTotalSpending()} 원</div>
        </div>
      </div>
    );
  }
}

export default DetailSummaryView;
