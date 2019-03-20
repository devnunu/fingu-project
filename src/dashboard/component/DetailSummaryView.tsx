import React, { Component } from 'react';

// model
import Account from 'model/account/Account';

// style
import styles from './DetailSummaryView.scss';

interface DetailSummaryViewProps {
  account: Account;
}

class DetailSummaryView extends Component<DetailSummaryViewProps, {}> {
  render() {
    const { account } = this.props;
    return (
      <div className={styles.container}>
        <div className={styles.title}>{account.name}</div>
        <div className={styles.incomeBox}>
          <div className={styles.incomeLabel}>수입</div>
          <div>{account.getTotalIncome()} 원</div>
        </div>
        <div className={styles.spendingBox}>
          <div className={styles.spendingLabel}>지출</div>
          <div>{account.getTotalSpending()} 원</div>
        </div>
      </div>
    );
  }
}

export default DetailSummaryView;
