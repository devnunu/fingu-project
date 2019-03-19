import ItemType from '../model/item/ItemType';
import ItemCategory from '../model/item/ItemCategory';

class ItemController {
  itemTypes: ItemType[];
  itemCategories: ItemCategory[];

  constructor() {
    this.itemTypes = [
      {
        property: ItemType.INCOME,
        name: '수입'
      },
      {
        property: ItemType.SAVINGINVEST,
        name: '저축투자'
      },
      {
        property: ItemType.SPENDING,
        name: '지출'
      }
    ];
    this.itemCategories = [
      {
        parentItemType: ItemType.INCOME,
        name: '급여 소득'
      },
      {
        parentItemType: ItemType.INCOME,
        name: '사업 소득'
      },
      {
        parentItemType: ItemType.SAVINGINVEST,
        name: '유동성 자산'
      },
      {
        parentItemType: ItemType.SAVINGINVEST,
        name: '적립형 자산'
      },
      {
        parentItemType: ItemType.SAVINGINVEST,
        name: '주식형 자산'
      },
      {
        parentItemType: ItemType.SAVINGINVEST,
        name: '연금성 자산'
      },
      {
        parentItemType: ItemType.SAVINGINVEST,
        name: '보장성 자산'
      },
      {
        parentItemType: ItemType.SPENDING,
        name: '고정지출'
      },
      {
        parentItemType: ItemType.SPENDING,
        name: '변동지출'
      },
      {
        parentItemType: ItemType.SPENDING,
        name: '계절성지출'
      }
    ];
  }

  public getItemTypes(): ItemType[] {
    return this.itemTypes;
  }

  public getItemTypeNames(): string[] {
    return this.itemTypes.map(itemType => itemType.name);
  }

  public getItemTypeById(property: number): ItemType {
    let result;
    this.itemTypes.forEach(itemType => {
      if (itemType.property === property) {
        result = itemType;
      }
    });
    return result;
  }

  public getItemTypeByName(name: string): ItemType {
    let result;
    this.itemTypes.forEach(itemType => {
      if (itemType.name === name) {
        result = itemType;
      }
    });
    return result;
  }

  public getItemCategories(itemType: number): ItemCategory[] {
    return this.itemCategories.filter(
      category => category.parentItemType === itemType
    );
  }

  public getCategoryNames(itemType: number): string[] {
    return this.getItemCategories(itemType).map(category => category.name);
  }

  public getItemCategoryByName(name: string): ItemCategory {
    let result;
    this.itemCategories.forEach(itemCategory => {
      if (itemCategory.name === name) {
        result = itemCategory;
      }
    });
    return result;
  }
}

export default new ItemController();
