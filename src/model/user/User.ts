import Account from '../account/Account';

class User {
  name: string;
  budget: number;
  dataSubmited: boolean;
  accounts: Account[];

  constructor() {
    this.dataSubmited = false;
    this.accounts = new Array();
  }

  public getTotalSpending(): number {
    return this.accounts.reduce(
      (result, nextItem) => result + nextItem.getTotalSpending(),
      0
    );
  }

  public getTotalAccountBalance(): number {
    return this.accounts.reduce(
      (result, nextItem) => result + nextItem.balance,
      0
    );
  }
}

export default User;
