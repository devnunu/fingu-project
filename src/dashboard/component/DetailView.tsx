import React, { Component } from 'react';

// model
import Account from 'model/account/Account';
import Item from 'model/item/Item';

// util
import StringUtil from 'common/utils/StringUtil';

// view
import Container from 'common/component/container/Container';
import EmptyView from 'common/component/view/EmptyView';
import DetailSummaryView from 'dashboard/component/DetailSummaryView';

// style
import styles from './DetailView.scss';

interface DetailViewProps {
  account: Account;
  onChangeAccount: (account: Account) => void;
  onClickItemInputModalOpen: () => void;
  onClickUpdateAccountModalOpen: () => void;
}

class DetailView extends Component<DetailViewProps, {}> {
  render() {
    const { account } = this.props;
    console.log('account', account);
    return (
      <Container className={styles.container}>
        <DetailSummaryView
          className={styles.summaryView}
          account={account}
          onClickItemInputModalOpen={this.props.onClickItemInputModalOpen}
          onClickUpdateAccountModalOpen={
            this.props.onClickUpdateAccountModalOpen
          }
        />
        {account.spendings.length === 0 ? (
          <EmptyView label={'내역'} />
        ) : (
          this.renderItemList(account.spendings)
        )}
      </Container>
    );
  }

  private renderItemList(spendings: Item[]) {
    return spendings.map((spending, index) => {
      return (
        <div className={styles.itemList} key={index}>
          <div className={styles.tag}>{spending.tag}</div>
          <div className={styles.name}>{spending.name}</div>
          <div className={styles.amount}>
            {StringUtil.getCurrencyValue(spending.amount)}원
          </div>
        </div>
      );
    });
  }
}

export default DetailView;
