import React, { Component, Fragment } from 'react';
import classNames from 'classnames';

// model
import TotalSpending, {
  SpendingTagItems
} from 'model/totalspeding/TotalSpending';
import { tagList } from 'model/item/Tag';

// view
import FinguPieChart from 'common/component/chart/FinguPieChart';

// util
import StringUtil from 'common/utils/StringUtil';

// styles
import styles from './AnalysisCommonStyle.scss';

interface SummaryTableViewProps {
  className?: string;
  totalSpending: TotalSpending;
  budget: number;
}

class SummaryTableView extends Component<SummaryTableViewProps, {}> {
  render() {
    const { totalSpending, budget } = this.props;
    const spendingTagItems = totalSpending.spendingTagItems;
    const totalSpendingAmount = totalSpending.getTotalSpendingSummary();
    const unidentifySpending = budget - totalSpendingAmount;
    return (
      <Fragment>
        <div className={classNames(styles.contentBox, this.props.className)}>
          <div className={styles.contentTitle}>{'유출항목별 비중'}</div>
          <table>
            <tbody>
              {tagList.map((tag, index) => {
                return (
                  <tr key={index}>
                    <td className={styles.tableRowKey}>{tag}</td>
                    <td>
                      {StringUtil.getCurrencyValue(spendingTagItems[tag])}원
                    </td>
                    <td>
                      {spendingTagItems[tag] === 0
                        ? 0
                        : (spendingTagItems[tag] * 100) /
                          (totalSpendingAmount + spendingTagItems[tag])}
                      %
                    </td>
                  </tr>
                );
              })}
              <tr>
                <td className={styles.tableRowKey}>미파악지출</td>
                <td>{StringUtil.getCurrencyValue(unidentifySpending)}원</td>
                <td>
                  {(unidentifySpending * 100) /
                    (totalSpendingAmount + unidentifySpending)}
                  %
                </td>
              </tr>
              <tr>
                <td
                  className={classNames(
                    styles.tableRowKey,
                    styles.summaryAmount
                  )}
                >
                  합계
                </td>
                <td>{StringUtil.getCurrencyValue(budget)}원</td>
                <td>-</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className={styles.graphBox}>
          <FinguPieChart
            className={styles.summaryChart}
            labels={[...tagList, '미파악지출']}
            data={[
              ...tagList.map(tag => spendingTagItems[tag]),
              unidentifySpending
            ]}
            backgroundColor={[
              '#003f5c',
              '#374c80',
              '#7a5195',
              '#58508d',
              '#d45087',
              '#bc5090',
              '#ff6361',
              '#ffa600'
            ]}
            hoverBackgroundColor={[
              '#003f5c',
              '#374c80',
              '#7a5195',
              '#58508d',
              '#d45087',
              '#bc5090',
              '#ff6361',
              '#ffa600'
            ]}
          />
          <div />
        </div>
      </Fragment>
    );
  }
}

export default SummaryTableView;
