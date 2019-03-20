class ItemType {
  public static INCOME = 0;
  public static SAVINGINVEST = 1;
  public static SPENDING = 2;

  public static NAME_INCOME = "수입";
  public static NAME_SAVINGINVENST = "저축투자";
  public static NAME_SPENDING = "지출";

  property: number;
  name: string;

  constructor(property: number, name: string) {
    this.property = property;
    this.name = name;
  }
}

export default ItemType;
