import { ItemType } from "./ItemType";

class Item {
  name: string;
  amount: number;
  type: ItemType;

  constructor(name: string, amount: number, type: ItemType) {
    this.name = name;
    this.amount = amount;
    this.type = type;
  }

  public isSpending(): boolean {
    return (
      this.type === ItemType.FIXEDSPENDING ||
      this.type === ItemType.CHANGEDSPENDING ||
      this.type === ItemType.SEASONALSPENDING
    );
  }
}

export default Item;
