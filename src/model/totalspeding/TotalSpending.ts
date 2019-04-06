import User from 'model/user/User';
import { tagList } from 'model/item/Tag';

export interface SpendingTagItems {
  [tag: string]: number;
}

class TotalSpending {
  private spendingTagItems: SpendingTagItems;

  constructor(user: User) {
    this.spendingTagItems = this.generateSpedingTagItems(user);
  }

  public getSpendingTagItems() {
    return this.spendingTagItems;
  }

  public generateSpedingTagItems(user: User): SpendingTagItems {
    if (this.spendingTagItems === undefined) this.spendingTagItems = {};
    tagList.forEach(tag => {
      this.spendingTagItems[tag] = user.getSpendingByTag(tag);
    });
    this.spendingTagItems['미파악지출'] = user.budget - user.getTotalSpending();
    return this.spendingTagItems;
  }

  public getTotalSpendingSummary() {
    return tagList.reduce((result, nextItem) => {
      if (this.spendingTagItems[nextItem] !== undefined)
        return result + this.spendingTagItems[nextItem];
      else return result;
    }, 0);
  }
}

export default TotalSpending;
