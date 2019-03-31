class Item {
  name: string;
  amount: number;
  tag: string;

  public validAllProperties(): boolean {
    return this.name !== undefined && this.amount !== undefined;
  }
}

export default Item;
