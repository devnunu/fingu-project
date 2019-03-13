import React, { Component } from "react";

import { ItemType, ItemTypeNames } from "../../model/item/ItemType";
import Account from "../../model/account/Account";

interface ItemInputViewProps {
  account: Account;
}

interface ItemInputViewState {
  itemType: ItemType;
}

class ItemInputView extends Component<ItemInputViewProps, {}> {
  constructor(props) {
    super(props);
    this.state = {
      itemType: ItemType.INCOME
    };
  }

  render() {
    const { account } = this.props;
    console.log("account", account);
    return (
      <div>
        <select>
          <option value={ItemType.INCOME}>
            {ItemTypeNames[ItemType.INCOME]}
          </option>
          <option value={ItemType.SAVINGINVEST}>
            {ItemTypeNames[ItemType.SAVINGINVEST]}
          </option>
          <option value={ItemType.SPENDING}>
            {ItemTypeNames[ItemType.SPENDING]}
          </option>
        </select>
        <button>완료</button>
      </div>
    );
  }
}

export default ItemInputView;
