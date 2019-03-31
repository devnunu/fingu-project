import Item from '../item/Item';
import StyleUtil from '../../common/utils/StyleUtil';

class Account {
  id: number;
  name: string;
  balance: number;
  spendings: Item[];
  accountColor: string;

  constructor(id: number) {
    this.id = id;
    this.name = '나의 계좌 ' + id;
    this.spendings = new Array();
    this.accountColor = StyleUtil.getRandomColor();
  }

  public getTotalSpending(): number {
    if (this.spendings === undefined || this.spendings.length === 0) return 0;
    return this.spendings.reduce(
      (result, nextItem) => result + nextItem.amount,
      0
    );
  }

  // 잔액 초과 인지 검사
  public checkOveredBalance(amount: number, selItemIndex?: number): boolean {
    if (selItemIndex !== undefined) {
      return (
        this.balance <
        this.getTotalSpending() - this.spendings[selItemIndex].amount + amount
      );
    }
    return this.balance < this.getTotalSpending() + amount;
  }
}

export default Account;
