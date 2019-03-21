import React, { Component } from 'react';

// model
import Account from 'model/account/Account';
import Item from 'model/item/Item';
import ItemCategory from 'model/item/ItemCategory';

// view
import Container from 'common/component/container/Container';
import ItemInputView from 'dashboard/component/ItemInputView';
import DetailSummaryView from 'dashboard/component/DetailSummaryView';
import HistoryTable from 'common/component/table/HistoryTable';

// model
import ItemType from 'model/item/ItemType';

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
        <DetailSummaryView className={styles.summaryView} account={account} />
        <ItemInputView
          className={styles.inputBox}
          account={account}
          onAddAccountItem={this.props.onAddAccountItem}
        />
        <div className={styles.historyBox}>
          {this.renderItemHistory(ItemType.NAME_SAVINGINVENST, true)}
          {this.renderItemHistory(ItemCategory.NAME_FIXEDSPENDING)}
          {this.renderItemHistory(ItemCategory.NAME_VARIANCESPENDING)}
          {this.renderItemHistory(ItemCategory.NAME_SEASONALSPENDING)}
        </div>
      </Container>
    );
  }

  private renderItemHistory(name: string, isType?: boolean) {
    const filteredItems = isType
      ? this.props.account.getSpendingItemByTypeName(name)
      : this.props.account.getSpendingItemByCategoryName(name);
    return <HistoryTable className={styles.historyTable} title={name} items={filteredItems} />;
  }
}

export default DetailView;
