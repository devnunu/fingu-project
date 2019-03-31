import React, { Component } from 'react';
import classNames from 'classnames';
import { Icon } from 'semantic-ui-react';

// model
import Account from 'model/account/Account';

// util
import StringUtil from 'common/utils/StringUtil';

// view
import AccountInputModal from 'common/component/modal/AccountInputModal';

// style
import styles from './DetailSummaryView.scss';

interface DetailSummaryViewProps {
  className?: string;
  account: Account;
  onClickItemInputModalOpen: () => void;
  onClickUpdateAccountModalOpen: () => void;
}

class DetailSummaryView extends Component<DetailSummaryViewProps, {}> {
  render() {
    const { account } = this.props;
    const totalSpending = account.getTotalSpending();
    return (
      <div className={classNames(styles.container, this.props.className)}>
        <div className={styles.topDetailSummarySection}>
          <div className={styles.titleBox}>
            <div
              className={styles.title}
              onClick={this.props.onClickUpdateAccountModalOpen}
            >
              {account.name}
              <span>
                <Icon name="pencil alternate" size="small" />
              </span>
            </div>
          </div>
          <div
            className={styles.buttonAddItem}
            onClick={this.props.onClickItemInputModalOpen}
          >
            내역 추가 +
          </div>
        </div>
        <div className={styles.incomeBox}>
          <div className={styles.label}>초기 잔액</div>
          <div className={styles.icon}>
            <Icon name="won sign" size="big" />
          </div>
          <div className={styles.amount}>
            {StringUtil.getCurrencyValue(account.balance)} 원
          </div>
        </div>
        <div className={styles.spendingBox}>
          <div className={styles.label}>지출</div>
          <div className={styles.icon}>
            <Icon name="money bill alternate outline" size="big" />
          </div>
          <div className={styles.amount}>
            {StringUtil.getCurrencyValue(totalSpending)} 원
          </div>
        </div>
        <div className={styles.totalAmountBox}>
          <div className={styles.label}>미파악 지출</div>
          <div className={styles.icon}>
            <Icon name="heart" size="big" />
          </div>
          <div className={styles.amount}>
            {StringUtil.getCurrencyValue(account.balance - totalSpending)} 원
          </div>
        </div>
      </div>
    );
  }
}

export default DetailSummaryView;
