class ItemType {
  public static INCOME = 0;
  public static SAVINGINVEST = 1;
  public static SPENDING = 2;

  property: string;
  name: string;

  constructor(property: string, name: string) {
    this.property = property;
    this.name = name;
  }
}

export default ItemType;
