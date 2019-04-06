import React, { Component } from 'react';
import classNames from 'classnames';

// model
import TotalSpending, {
  SpendingTagItems
} from 'model/totalspeding/TotalSpending';
import { tagList } from 'model/item/Tag';

// view
import FinguHorizontoalBar from 'common/component/chart/FinguHorizontalBar';
import FinguPieChart from 'common/component/chart/FinguPieChart';

// util
import StringUtil from 'common/utils/StringUtil';

// styles
import styles from './TotalSpedingStatusView.scss';

interface TotalSpedingStatusViewProps {
  totalSpending: TotalSpending;
  isAfterAdjust: boolean;
  budget: number;
}

class TotalSpedingStatusView extends Component<
  TotalSpedingStatusViewProps,
  {}
> {
  render() {
    const { totalSpending, budget } = this.props;
    if (totalSpending === undefined) return null;
    const spendingTagItems = totalSpending.getSpendingTagItems();
    const homeSpending =
      spendingTagItems['고정지출'] + spendingTagItems['변동지출'];
    return (
      <div>
        <div className={styles.title}>
          유출 조정 {this.getPreviousPostText()}
        </div>
        <div className={styles.statusBox}>
          {this.renderStatusTable(spendingTagItems)}
          <FinguHorizontoalBar
            className={styles.barChart}
            labels={['저축투자', '지출합계', '미파악지출']}
            data={this.getChartData(spendingTagItems)}
            backgroundColor={['#0088FE', '#00C49F', '#FFBB28']}
            hoverBackgroundColor={['#0088FE', '#00C49F', '#FFBB28']}
          />
        </div>
        <div className={styles.title}>
          소득대비 가계지출 비중 - 조정 {this.getPreviousPostText()}
        </div>
        <FinguPieChart
          className={styles.pieChart}
          labels={['가계지출', '기타']}
          data={[homeSpending, budget - homeSpending]}
          backgroundColor={['#0088FE', '#00C49F']}
          hoverBackgroundColor={['#0088FE', '#00C49F']}
        />
        <div>
          <div className={styles.rightSpendingBox}>
            <div className={styles.spendingTitle}>
              조정 {this.getPreviousPostText()} 가계 지출 금액
            </div>
            <div className={styles.spendingAmount}>{homeSpending}원</div>
          </div>
          <div className={styles.leftSpendingBox}>
            <div className={styles.spendingTitle}>적정 가계 지출 금액</div>
            <div className={styles.spendingAmount}>
              {budget === 0 ? 0 : Math.round(budget / 2)}원
            </div>
          </div>
        </div>
      </div>
    );
  }

  private renderStatusTable(spedingTagItems: SpendingTagItems) {
    const { totalSpending } = this.props;
    return (
      <table>
        <tbody>
          {tagList.map((tag, index) => {
            return (
              <tr key={index}>
                <td className={styles.tableRowKey}>{tag}</td>
                <td className={styles.tableRowValue}>
                  {StringUtil.getCurrencyValue(spedingTagItems[tag])}원
                </td>
              </tr>
            );
          })}
          <tr>
            <td
              className={classNames(
                styles.tableRowKey,
                styles.tableRowSummaryKey
              )}
            >
              합계
            </td>
            <td
              className={classNames(
                styles.tableRowValue,
                styles.tableRowSummaryValue
              )}
            >
              {StringUtil.getCurrencyValue(
                totalSpending.getTotalSpendingSummary()
              )}
              원
            </td>
          </tr>
        </tbody>
      </table>
    );
  }

  private getPreviousPostText() {
    return this.props.isAfterAdjust ? '후' : '전';
  }

  private getChartData(spendingTagItems: SpendingTagItems): number[] {
    return [
      spendingTagItems['저축투자'],
      this.getPureTotalSpending(spendingTagItems),
      spendingTagItems['미파악지출']
    ];
  }

  private getPureTotalSpending(spendingTagItems: SpendingTagItems): number {
    let result = 0;
    tagList.forEach(tag => {
      if (
        tag !== '저축투자' &&
        tag !== '미파악지출' &&
        spendingTagItems[tag] !== undefined
      )
        result += spendingTagItems[tag];
    });
    return result;
  }
}

export default TotalSpedingStatusView;
