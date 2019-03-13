export enum ItemType {
  INCOME = 0,
  SAVINGINVEST,
  SPENDING
}

const ItemTypeNames: string[] = [
  "수입",
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
