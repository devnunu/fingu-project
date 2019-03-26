import Item from '../item/Item';
import StyleUtil from '../../common/utils/StyleUtil';

class Account {
  id: number;
  name: string;
  balance: number;
  incomes: Item[];
  spendings: Item[];
  accountColor: string;

  constructor(id: number) {
    this.id = id;
    this.name = '나의 계좌 ' + id;
    this.incomes = new Array();
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
}

export default Account;
