import User from 'model/user/User';
import { tagList } from 'model/item/Tag';

export interface SpendingTagItems {
  [tag: string]: number;
}

class TotalSpending {
  public spendingTagItems: SpendingTagItems;

  constructor(user: User) {
    this.spendingTagItems = this.generateSpedingTagItems(user);
  }

  public generateSpedingTagItems(user: User): SpendingTagItems {
    if (this.spendingTagItems === undefined) this.spendingTagItems = {};
    tagList.forEach(tag => {
      this.spendingTagItems[tag] = user.getSpendingByTag(tag);
    });
    return this.spendingTagItems;
  }

  public getTotalSpendingSummary() {
    return tagList.reduce((result, nextItem) => {
      if (this.checkItemAmountValid(nextItem))
        return result + this.spendingTagItems[nextItem];
      else return result;
    }, 0);
  }

  private checkItemAmountValid(tag: string): boolean {
    const amount = this.spendingTagItems[tag];
    return amount !== undefined && amount !== null && !isNaN(amount);
  }
}

export default TotalSpending;
