import * as React from 'react';
import { Component } from 'react';

// model
import Item from '../../model/item/Item';
import ItemType from '../../model/item/ItemType';
import ItemCategory from '../../model/item/ItemCategory';
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
  onAddAccountItem: (item: Item) => void;
}

interface ItemInputViewState {
  item: Item;
}

class ItemInputView extends Component<ItemInputViewProps, ItemInputViewState> {
  constructor(props) {
    super(props);
    this.state = {
      item: this.initialInputItem(),
    };
  }

  render() {
    const { account } = this.props;
    const { item } = this.state;
    console.log('name', item.name);
    console.log('amount', item.amount);
    return (
      <div className={styles.container}>
        <div className={styles.topBox}>
          <div className={styles.title}>내역 추가</div>
          <div className={styles.selectorBox}>
            <Selector
              className={styles.selectorType}
              items={ItemController.getItemTypeNames()}
              onChange={this.onChangeItemType.bind(this)}
            />
            <Selector
              className={styles.selectorCategory}
              items={ItemController.getCategoryNames(item.type.property)}
              onChange={this.onChangeItemCategory.bind(this)}
            />
          </div>
        </div>
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
          <Button className={styles.addButton} text="추가" onClick={event => this.handleAddAccountItem(event, item)} />
        </div>
      </div>
    );
  }

  private onChangeItemType(event) {
    const { item } = this.state;
    item.type = ItemController.getItemTypeByName(event.target.value);
    item.category = ItemController.getItemCategories(item.type.property)[0];
    this.setState({ ...this.state, item });
  }

  private onChangeItemCategory(event) {
    const { item } = this.state;
    item.category = ItemController.getItemCategoryByName(event.target.value);
    this.setState({ ...this.state, item });
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
    this.setState({ ...this.state, item: this.initialInputItem() });
    this.props.onAddAccountItem(item);
  }

  private initialInputItem(): Item {
    const initialItemType = ItemController.getItemTypeById(ItemType.INCOME);
    const initialItemCategory = ItemController.getItemCategories(ItemType.INCOME)[0];
    return new Item(undefined, undefined, initialItemType, initialItemCategory);
  }
}

export default ItemInputView;
