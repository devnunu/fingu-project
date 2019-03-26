class StringUtil {
  public static getCurrencyValue = value =>
    Number(value)
      .toLocaleString('en')
      .split('.')[0];

  public static isEmptyString = str => str === undefined || str === '';
}

export default StringUtil;
