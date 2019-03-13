import Item from "../item/Item";

class Account {
  id: number;
  name: string;
  balance: number;
  incomes: Item[];
  spendings: Item[];

  constructor() {
    this.incomes = new Array();
    this.spendings = new Array();
  }

  public getTotalIncome(): number {
    if (this.incomes === undefined || this.incomes.length === 0) return 0;
    return this.incomes.reduce(
      (result, nextItem) => result + nextItem.amount,
      0
    );
  }

  public getTotalSpending(): number {
    if (this.spendings === undefined || this.spendings.length === 0) return 0;
    return this.spendings.reduce(
      (result, nextItem) => result + nextItem.amount,
      0
    );
  }
}

export default Account;
