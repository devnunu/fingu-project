import Account from "../account/Account";

class User {
  name: string;
  age: number;
  dataSubmited: boolean;
  accounts: Account[];

  constructor() {
    this.dataSubmited = false;
    this.accounts = new Array();
  }

  public getTotalIncome(): number {
    return this.accounts.reduce(
      (result, nextItem) => result + nextItem.getTotalIncome(),
      0
    );
  }

  public getTotalSpending(): number {
    return this.accounts.reduce(
      (result, nextItem) => result + nextItem.getTotalSpending(),
      0
    );
  }
}

export default User;
