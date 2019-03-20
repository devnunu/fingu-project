import ItemType from "./ItemType";
import ItemCategory from "./ItemCategory";

class Item {
  name: string;
  amount: number;
  type: ItemType;
  category: ItemCategory;

  constructor(
    name: string,
    amount: number,
    type: ItemType,
    category: ItemCategory
  ) {
    this.name = name;
    this.amount = amount;
    this.type = type;
    this.category = category;
  }

  public isSpending(): boolean {
    return this.type.property !== ItemType.INCOME;
  }

  public validAllProperties(): boolean {
    return (
      this.name !== undefined &&
      this.amount !== undefined &&
      this.type !== undefined &&
      this.category !== undefined
    );
    }
}

export default Item;
