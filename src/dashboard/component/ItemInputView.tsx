import React, { Component } from 'react';
import classNames from 'classnames';

// model
import Item from '../../model/item/Item';
import Account from '../../model/account/Account';

// controller
import ItemController from '../../controller/ItemController';

// view
import Button from 'common/component/button/Button';
import Selector from 'common/component/input/Selector';
import Input from 'common/component/input/Input';

// styles
import styles from './ItemInputView.scss';

interface ItemInputViewProps {
  account: Account;
  className?: string;
  onAddAccountItem: (item: Item) => void;
}

interface ItemInputViewState {
  item: Item;
}

class ItemInputView extends Component<ItemInputViewProps, ItemInputViewState> {
  constructor(props) {
    super(props);
    this.state = {
      item: new Item()
    };
  }

  render() {
    const { account } = this.props;
    const { item } = this.state;
    return (
      <div className={classNames(styles.container, this.props.className)}>
        <div className={styles.title}>내역 추가</div>

        <Input
          className={styles.inputItemName}
          type="text"
          label="내역명"
          value={item.name}
          onChange={this.onChangeItemName.bind(this)}
        />
        <Input
          className={styles.inputItemAmount}
          type="number"
          label="금액"
          value={item.amount}
          onChange={this.onChangeItemAmount.bind(this)}
        />
        <div className={styles.addButtonBox}>
          <Button
            className={styles.addButton}
            text="추가"
            onClick={event => this.handleAddAccountItem(event, item)}
          />
        </div>
      </div>
    );
  }
  private onChangeItemName(event) {
    const { item } = this.state;
    item.name = event.target.value;
    this.setState({ ...this.state, item });
  }

  private onChangeItemAmount(event) {
    const { item } = this.state;
    item.amount = parseInt(event.target.value);
    this.setState({ ...this.state, item });
  }

  private handleAddAccountItem(event, item) {
    this.setState({ ...this.state, item: new Item() });
    this.props.onAddAccountItem(item);
  }
}

export default ItemInputView;
