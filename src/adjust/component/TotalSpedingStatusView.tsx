import React, { Component } from 'react';

// model
import TotalSpending from 'model/totalspeding/TotalSpending';
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
  totalSpendingAmount: number;
}

class TotalSpedingStatusView extends Component<
  TotalSpedingStatusViewProps,
  {}
> {
  render() {
    const { totalSpending, budget } = this.props;
    const homeSpending = totalSpending['고정지출'] + totalSpending['변동지출'];
    if (totalSpending === undefined) return null;
    return (
      <div>
        <div className={styles.title}>
          유출 조정 {this.getPreviousPostText()}
        </div>
        <div className={styles.statusBox}>
          {this.renderStatusTable()}
          <FinguHorizontoalBar
            className={styles.barChart}
            labels={['저축투자', '지출합계', '미파악지출']}
            data={this.getChartData()}
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

  private renderStatusTable() {
    const { totalSpending } = this.props;
    return (
      <table>
        <tbody>
          {tagList.map((tag, index) => {
            return (
              <tr key={index}>
                <td className={styles.tableRowKey}>{tag}</td>
                <td className={styles.tableRowValue}>
                  {StringUtil.getCurrencyValue(totalSpending[tag])}원
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }

  private getPreviousPostText() {
    return this.props.isAfterAdjust ? '후' : '전';
  }

  private getChartData(): number[] {
    const { totalSpending } = this.props;
    return [
      totalSpending['저축투자'],
      this.getPureTotalSpending(),
      totalSpending['미파악지출']
    ];
  }

  private getPureTotalSpending(): number {
    let result = 0;
    tagList.forEach(tag => {
      if (
        tag !== '저축투자' &&
        tag !== '미파악지출' &&
        this.props.totalSpending[tag] !== undefined
      )
        result += this.props.totalSpending[tag];
    });
    return result;
  }
}

export default TotalSpedingStatusView;
