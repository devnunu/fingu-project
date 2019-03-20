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

// style
import styles from './DetailView.scss';
import ItemType from 'model/item/ItemType';

interface DetailViewProps {
  account: Account;
  onAddAccountItem: (item: Item) => void;
}

class DetailView extends Component<DetailViewProps, {}> {
  render() {
    const { account } = this.props;
    return (
      <Container className={styles.container}>
        <DetailSummaryView account={account} />
        <ItemInputView
          account={account}
          onAddAccountItem={this.props.onAddAccountItem}
        />
        <div>
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
    return <HistoryTable title={name} items={filteredItems} />;
  }
}

export default DetailView;
