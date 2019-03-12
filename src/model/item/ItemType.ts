export enum ItemType {
  SAVINGINVEST = 1,
  FIXEDSPENDING = 2,
  CHANGEDSPENDING = 3,
  SEASONALSPENDING = 4
}

const ItemTypeNames: string[] = [
  "저축투자",
  "고정지출",
  "변동지출",
  "계절성지출"
];

export namespace ItemType {
  export function getName(value: ItemType) {
    return ItemTypeNames[value];
  }
}
