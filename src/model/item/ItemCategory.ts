export enum IncomeCategory {
  SALARY = 0,
  BUSINESS
}

export const IncomeCategoryNames = ["급여 소득", "사업 소득"];

export enum SavingInvestCategory {
  CURRENTASSET = 0, // 유동성 자산
  DEPOSITEDASSET, // 적립형 자산
  STOCKASSET, // 주식형 자산
  PENSIONASSET, // 연금성 자산
  INSURANCEASSET // 보장성 자산
}

export const SavingInvestCategoryNames = [
  "유동성 자산",
  "적립형 자산",
  "주식형 자산",
  "연금성 자산",
  "보장성 자산"
];

export enum SpendingCategory {
  FIXEDSPENDING = 0,
  CHANGEDSPENDING,
  SEASONALSPENDING
}

export const SpendingCategoryNames = ["고정지출", "변동지출", "계절성지출"];
