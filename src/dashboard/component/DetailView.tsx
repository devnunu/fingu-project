import React, { Component } from 'react';

// model
import Account from 'model/account/Account';
import Item from 'model/item/Item';

// view
import Container from 'common/component/container/Container';
import ItemInputView from 'dashboard/component/ItemInputView';
import DetailSummaryView from 'dashboard/component/DetailSummaryView';
import HistoryTable from 'common/component/table/HistoryTable';

// style
import styles from './DetailView.scss';

interface DetailViewProps {
  account: Account;
  onAddAccountItem: (item: Item) => void;
}

class DetailView extends Component<DetailViewProps, {}> {
  render() {
    const { account } = this.props;
    return (
      <Container className={styles.container}>
        <DetailSummaryView
          className={styles.summaryView}
          account={account}
          onChangeAccountName={this.onChangeAccountName.bind(this)}
        />
        <ItemInputView
          className={styles.inputBox}
          account={account}
          onAddAccountItem={this.props.onAddAccountItem}
        />
        <div className={styles.historyBox} />
      </Container>
    );
  }

  private onChangeAccountName(accountName: string) {
    const { account } = this.props;
    account.name = accountName;
    this.setState({
      ...this.state,
      account
    });
  }
}

export default DetailView;
