import Account from '../account/Account';
import { number } from 'prop-types';
import TotalSpending from 'model/totalspeding/TotalSpending';
import { tagList } from 'model/item/Tag';

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

  public getSpendingByTag(tag: string) {
    return this.accounts.reduce(
      (result, nextItem) => result + nextItem.getSpendingByTag(tag),
      0
    );
  }

  public getTotalAccountsBalance(): number {
    return this.accounts.reduce(
      (result, nextItem) => result + nextItem.balance,
      0
    );
  }

  public getTotalSpendingObject(): TotalSpending {
    let totalSpending: TotalSpending = {};
    tagList.forEach(tag => {
      totalSpending[tag] = this.getSpendingByTag(tag);
    });
    totalSpending['미파악지출'] = this.budget - this.getTotalSpending();
    return totalSpending;
  }

  // 예산 초과인지 검사
  public checkOveredBudget(balance: number, selAccountIndex?: number): boolean {
    if (selAccountIndex !== undefined) {
      return (
        this.budget <
        this.getTotalAccountsBalance() -
          this.accounts[selAccountIndex].balance +
          balance
      );
    }
    return this.budget < this.getTotalAccountsBalance() + balance;
  }
}

export default User;
