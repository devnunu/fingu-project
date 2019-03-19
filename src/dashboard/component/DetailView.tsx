import React, { Component } from 'react';

// model
import Account from 'model/account/Account';
import Item from 'model/item/Item';

// view
import ItemInputView from 'dashboard/component/ItemInputView';

interface DetailViewProps {
  account: Account;
  onAddAccountItem: (item: Item) => void;
}

class DetailView extends Component<DetailViewProps, {}> {
  render() {
    const { account } = this.props;
    return <ItemInputView account={account} onAddAccountItem={this.props.onAddAccountItem} />;
  }
}

export default DetailView;
