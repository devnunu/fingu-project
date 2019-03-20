import React, { Component } from 'react';

// model
import Account from 'model/account/Account';
import Item from 'model/item/Item';

// view
import ItemInputView from 'dashboard/component/ItemInputView';
import Container from 'common/component/container/Container';

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
        <ItemInputView account={account} onAddAccountItem={this.props.onAddAccountItem} />
      </Container>
    );
  }
}

export default DetailView;
