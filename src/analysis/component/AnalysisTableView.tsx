import React, { Component, Fragment } from 'react';
import classNames from 'classnames';

// view
import FinguPieChart from 'common/component/chart/FinguPieChart';

// util
import StringUtil from 'common/utils/StringUtil';

// styles
import styles from './AnalysisCommonStyle.scss';

interface AnalysisTableViewProps {
  className?: string;
  totalIncome: number;
  compareValue: number;
  compareValueName: string;
  contentTitle: string;
  contentDesc: string;
}

class AnalysisTableView extends Component<AnalysisTableViewProps, {}> {
  render() {
    const {
      totalIncome,
      compareValue,
      compareValueName,
      contentTitle, 
      contentDesc
    } = this.props;
    return (
      <Fragment>
        <div className={classNames(styles.contentBox, this.props.className)}>
          <div className={styles.contentTitle}>{contentTitle}</div>
          <table>
            <tbody>
              <tr>
                <td className={styles.tableRowKey}>1년 총소득</td>
                <td>{StringUtil.getCurrencyValue(totalIncome)}원</td>
                <td>100%</td>
              </tr>
              <tr>
                <td className={styles.tableRowKey}>{compareValueName}</td>
                <td>{StringUtil.getCurrencyValue(compareValue)}원</td>
                <td>{(compareValue * 100) / (totalIncome + compareValue)}%</td>
              </tr>
            </tbody>
          </table>
          <div className={styles.contentDesc}>{contentDesc}</div>
        </div>
        <div className={styles.graphBox}>
          <FinguPieChart
            className={styles.summaryChart}
            labels={[compareValueName, '그 외']}
            data={[compareValue, totalIncome - compareValue]}
            backgroundColor={['#00C49F', '#9c9c9c']}
            hoverBackgroundColor={['#00C49F', '#9c9c9c']}
          />
          <div />
        </div>
      </Fragment>
    );
  }
}

export default AnalysisTableView;
