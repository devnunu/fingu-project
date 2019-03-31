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
import ItemInputModal from 'common/component/modal/ItemInputModal';

// style
import styles from './DetailView.scss';

interface DetailViewProps {
  account: Account;
  onAddAccountItem: (item: Item) => void;
  onChangeAccount: (account: Account) => void;
}

interface DetailViewState {
  isOpenAddItemModal: boolean;
}

class DetailView extends Component<DetailViewProps, DetailViewState> {
  constructor(props) {
    super(props);
    this.state = {
      isOpenAddItemModal: false
    };
  }

  render() {
    const { account } = this.props;
    const { isOpenAddItemModal } = this.state;
    return (
      <Container className={styles.container}>
        <DetailSummaryView
          className={styles.summaryView}
          account={account}
          onChangeAccount={this.props.onChangeAccount}
          onClickModalOpen={this.onClickModalOpen.bind(this)}
        />
        {account.spendings.length === 0 ? (
          <EmptyView label={'내역'} />
        ) : (
          this.renderItemList(account.spendings)
        )}
        <ItemInputModal
          modalOpen={isOpenAddItemModal}
          title={'내역 추가'}
          description={'소비 내역을 추가합니다'}
          onClickSubmit={this.handleOnClickSubmit.bind(this)}
          onRequestClose={this.onClickModalOpen.bind(this)}
        />
      </Container>
    );
  }

  private renderItemList(spendings: Item[]) {
    return spendings.map((spending, index) => {
      return (
        <div className={styles.itemList} key={index}>
          <div className={styles.index}>{index + 1}</div>
          <div className={styles.tag}>{spending.tag}</div>
          <div className={styles.name}>{spending.name}</div>
          <div className={styles.amount}>
            {StringUtil.getCurrencyValue(spending.amount)}원
          </div>
        </div>
      );
    });
  }

  private onClickModalOpen() {
    this.setState({
      ...this.state,
      isOpenAddItemModal: !this.state.isOpenAddItemModal
    });
  }

  private handleOnClickSubmit(item: Item) {
    this.props.onAddAccountItem(item);
    this.setState({
      ...this.state,
      isOpenAddItemModal: !this.state.isOpenAddItemModal
    });
  }
}

export default DetailView;
