import React, { Component } from 'react';
import classNames from 'classnames';
import { Icon } from 'semantic-ui-react';

// model
import Account from 'model/account/Account';

// view
import SingleInputModal from 'common/component/modal/SingleInputModal';

// style
import styles from './DetailSummaryView.scss';

interface DetailSummaryViewProps {
  className?: string;
  account: Account;
  onChangeAccountName: (accountName: string) => void;
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
        <div className={styles.title}>
          {account.name}
          <span onClick={this.onClickAccountNameEdit.bind(this)}>
            <Icon name="pencil alternate" size="small" />
          </span>
        </div>
        <div className={styles.incomeBox}>
          <div className={styles.incomeLabel}>초기 잔액</div>
          <div>{account.balance} 원</div>
        </div>
        <div className={styles.spendingBox}>
          <div className={styles.spendingLabel}>지출</div>
          <div>{totalSpending} 원</div>
        </div>
        <div>
          <div>합계</div>
          <div>{account.balance - totalSpending} 원</div>
        </div>
        <SingleInputModal
          title={'계좌이름 변경'}
          description={'계좌이름을 변경합니다'}
          modalOpen={isOpenAccountNameEditModal}
          onClickSubmit={this.handleChangeAccountName.bind(this)}
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

  private handleChangeAccountName(accountName: string) {
    this.props.onChangeAccountName(accountName);
    this.setState({
      ...this.state,
      isOpenAccountNameEditModal: !this.state.isOpenAccountNameEditModal
    });
  }
}

export default DetailSummaryView;
