import Item from "../item/Item";

class Account {
  balance: number;
  incomes: Item[];
  spendings: Item[];

  constructor() {
    this.incomes = new Array();
    this.spendings = new Array();
  }

  public getTotalIncome() {
    if (this.incomes === undefined || this.incomes.length === 0) return 0;
    return this.incomes.reduce(
      (result, nextItem) => result + nextItem.amount,
      0
    );
  }
}

export default Account;
