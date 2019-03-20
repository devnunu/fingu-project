class ItemCategory {

  public static NAME_SALARY = "급여 소득";
  public static NAME_BUSINESSINCOME = "사업 소득";
  public static NAME_TRANSFER = "이체";

  public static NAME_CURRENTASSETS = "유동성 자산";
  public static NAME_SAVINGASSETS = "적립형 자산";
  public static NAME_STOCKASSETS = "주식형 자산";
  public static NAME_PENSIONASSETS = "연금성 자산";
  public static NAME_INSURANCEASSETS = "보장성 자산";

  public static NAME_FIXEDSPENDING = "고정지출";
  public static NAME_VARIANCESPENDING = "변동지출";
  public static NAME_SEASONALSPENDING = "계절성지출";

  parentItemType: number;
  name: string;
}

export default ItemCategory;
