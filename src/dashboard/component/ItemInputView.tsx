import React, { Component } from "react";

import ItemType from "../../model/item/ItemType";

interface ItemInputViewProps {
  isIncomeItem: boolean;
}

class ItemInputView extends Component<ItemInputViewProps, {}> {
  render() {
    const { isIncomeItem } = this.props;
    return (
      <div>
        {isIncomeItem
          ? this.renderIncomeItemInput()
          : this.renderSpendingItemInput()}
      </div>
    );
  }

  renderIncomeItemInput() {
    return (
      <div>
        <div>
          <span>수입</span>
        </div>
      </div>
    );
  }

  renderSpendingItemInput() {
    return (
      <div>
        <div>
          <span>지출</span>
        </div>
      </div>
    );
  }
}

export default ItemInputView;
