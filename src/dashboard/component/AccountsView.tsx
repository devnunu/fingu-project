import React, { Component } from 'react';
import Slider from 'react-slick';

// model
import Account from '../../model/account/Account';

// util
import StringUtil from 'common/utils/StringUtil';

// view
import AccountItemView from './AccountItemView';
import EmptyView from 'common/component/view/EmptyView';
import Container from '../../common/component/container/Container';

import styles from './AccountsView.scss';

interface AccountsViewProps {
  accounts: Account[];
  selAccountIndex: number;
  totalAccountBalance: number;
  onClickAddAccountModalOpen: () => void;
  onClickSelectAccount: (selAccountIndex) => void;
  onDeleteAccount: (index: number) => void;
}

class AccountsView extends Component<AccountsViewProps, {}> {
  render() {
    const { accounts } = this.props;
    return (
      <Container className={styles.conatiner}>
        <div className={styles.topSection}>
          <div className={styles.totalBudget}>
            <span>총 계좌 잔액:</span>
            {StringUtil.getCurrencyValue(this.props.totalAccountBalance)} 원
          </div>
          <div
            className={styles.buttonAddAccount}
            onClick={this.props.onClickAddAccountModalOpen}
          >
            계좌 추가 +
          </div>
        </div>

        {accounts.length === 0 ? (
          <EmptyView label={'계좌'} />
        ) : (
          this.renderAccountItem(accounts)
        )}
      </Container>
    );
  }

  renderAccountItem(accounts) {
    const settings = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 3
    };
    return (
      <Slider {...settings} className={styles.itemList}>
        {accounts.map((account, index) => (
          <AccountItemView
            key={index}
            index={index}
            account={account}
            selected={index === this.props.selAccountIndex}
            className={styles.accountItem}
            onClickSelectAccount={this.props.onClickSelectAccount}
            onDeleteAccount={this.props.onDeleteAccount}
          />
        ))}
      </Slider>
    );
  }
}

export default AccountsView;
