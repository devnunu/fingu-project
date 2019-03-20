import ItemType from '../model/item/ItemType';
import ItemCategory from '../model/item/ItemCategory';

class ItemController {
  itemTypes: ItemType[];
  itemCategories: ItemCategory[];

  constructor() {
    this.itemTypes = [
      {
        property: ItemType.INCOME,
        name: ItemType.NAME_INCOME
      },
      {
        property: ItemType.SAVINGINVEST,
        name: ItemType.NAME_SAVINGINVENST
      },
      {
        property: ItemType.SPENDING,
        name: ItemType.NAME_SPENDING
      }
    ];
    this.itemCategories = [
      {
        parentItemType: ItemType.INCOME,
        name: ItemCategory.NAME_SALARY
      },
      {
        parentItemType: ItemType.INCOME,
        name: ItemCategory.NAME_BUSINESSINCOME
      },
      {
        parentItemType: ItemType.INCOME,
        name: ItemCategory.NAME_TRANSFER
      },
      {
        parentItemType: ItemType.SAVINGINVEST,
        name: ItemCategory.NAME_CURRENTASSETS
      },
      {
        parentItemType: ItemType.SAVINGINVEST,
        name: ItemCategory.NAME_SAVINGASSETS
      },
      {
        parentItemType: ItemType.SAVINGINVEST,
        name: ItemCategory.NAME_STOCKASSETS
      },
      {
        parentItemType: ItemType.SAVINGINVEST,
        name: ItemCategory.NAME_PENSIONASSETS
      },
      {
        parentItemType: ItemType.SAVINGINVEST,
        name: ItemCategory.NAME_INSURANCEASSETS
      },
      {
        parentItemType: ItemType.SPENDING,
        name: ItemCategory.NAME_FIXEDSPENDING
      },
      {
        parentItemType: ItemType.SPENDING,
        name: ItemCategory.NAME_VARIANCESPENDING
      },
      {
        parentItemType: ItemType.SPENDING,
        name: ItemCategory.NAME_SEASONALSPENDING
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
