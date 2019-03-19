class StringUtil {
  public static getCurrencyValue = value =>
    Number(value)
      .toLocaleString('en')
      .split('.')[0];
}

export default StringUtil;
