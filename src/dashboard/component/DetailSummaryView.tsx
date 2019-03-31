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
  onChangeAccount: (account: Account) => void;
}

interface DetailSummaryViewState {
  isOpenAccountNameEditModal: boolean;
}

class DetailSummaryView extends Component<
  DetailSummaryViewProps,
  DetailSummaryViewState
> {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      isOpenAccountNameEditModal: false
    };
  }

  render() {
    const { account } = this.props;
    const { isOpenAccountNameEditModal } = this.state;
    const totalSpending = account.getTotalSpending();
    return (
      <div className={classNames(styles.container, this.props.className)}>
        <div>
          <div
            className={styles.title}
            onClick={this.onClickAccountNameEdit.bind(this)}
          >
            {account.name}
            <span>
              <Icon name="pencil alternate" size="small" />
            </span>
          </div>
        </div>
        <div className={styles.incomeBox}>
          <div className={styles.icon}>
            <Icon name="won sign" size="big" />
          </div>
          <div className={styles.amount}>
            {StringUtil.getCurrencyValue(account.balance)} 원
          </div>
          <div className={styles.incomeLabel}>초기 잔액</div>
        </div>
        <div className={styles.spendingBox}>
          <div className={styles.icon}>
            <Icon name="money bill alternate outline" size="big" />
          </div>
          <div className={styles.amount}>
            {StringUtil.getCurrencyValue(totalSpending)} 원
          </div>
          <div className={styles.spendingLabel}>지출</div>
        </div>
        <div className={styles.totalAmountBox}>
          <div className={styles.icon}>
            <Icon name="heart" size="big" />
          </div>
          <div className={styles.amount}>
            {StringUtil.getCurrencyValue(account.balance - totalSpending)} 원
          </div>
          <div>합계</div>
        </div>
        <AccountInputModal
          title={'계좌 정보 수정'}
          description={'계좌 정보를 변경합니다'}
          parentAccount={account}
          modalOpen={isOpenAccountNameEditModal}
          onClickSubmit={this.handleChangeAccount.bind(this)}
          onRequestClose={this.onClickAccountNameEdit.bind(this)}
        />
      </div>
    );
  }

  private onClickAccountNameEdit(): void {
    this.setState({
      ...this.state,
      isOpenAccountNameEditModal: !this.state.isOpenAccountNameEditModal
    });
  }

  private handleChangeAccount(account: Account) {
    this.props.onChangeAccount(account);
    this.setState({
      ...this.state,
      isOpenAccountNameEditModal: !this.state.isOpenAccountNameEditModal
    });
  }
}

export default DetailSummaryView;
