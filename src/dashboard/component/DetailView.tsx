import React, { Component } from 'react';

// model
import Account from 'model/account/Account';
import Item from 'model/item/Item';

// view
import Container from 'common/component/container/Container';
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
        <ItemInputModal
          modalOpen={isOpenAddItemModal}
          title={'내역 추가'}
          description={'소비 내역을 추가합니다'}
          onClickSubmit={this.props.onAddAccountItem}
          onRequestClose={this.onClickModalOpen.bind(this)}
        />
      </Container>
    );
  }

  private onClickModalOpen() {
    this.setState({
      ...this.state,
      isOpenAddItemModal: !this.state.isOpenAddItemModal
    });
  }
}

export default DetailView;
