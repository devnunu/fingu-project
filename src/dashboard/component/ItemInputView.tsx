import * as React from "react";
import { Component } from "react";

import Item from "../../model/item/Item";
import ItemType from "../../model/item/ItemType";
import ItemCategory from "../../model/item/ItemCategory";
import Account from "../../model/account/Account";
import ItemController from "../../controller/ItemController";

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
    const initialItemType = ItemController.getItemTypeById(ItemType.INCOME);
    const initialItemCategory = ItemController.getItemCategories(
      ItemType.INCOME
    )[0];
    this.state = {
      item: new Item(undefined, undefined, initialItemType, initialItemCategory)
    };
  }

  render() {
    const { account } = this.props;
    const { item } = this.state;
    return (
      <div>
        <select
          onChange={this.onChangeItemType.bind(this)}
          value={item.type.name}
        >
          {ItemController.getItemTypes().map((itemType, index) => (
            <option key={index} value={itemType.name}>
              {itemType.name}
            </option>
          ))}
        </select>
        <select
          onChange={this.onChangeItemCategory.bind(this)}
          value={item.category.name}
        >
          {ItemController.getItemCategories(item.type.property).map(
            (category, index) => (
              <option key={index} value={category.name}>
                {category.name}
              </option>
            )
          )}
        </select>
        <div>
          <span>내역명</span>
          <input type="text" onChange={this.onChangeItemName.bind(this)} />
        </div>
        <div>
          <span>금액</span>
          <input type="number" onChange={this.onChangeItemAmount.bind(this)} />
        </div>
        <button onClick={event => this.props.onAddAccountItem(item)}>
          완료
        </button>
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
}

export default ItemInputView;
