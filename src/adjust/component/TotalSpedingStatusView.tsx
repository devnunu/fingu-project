import React, { Component } from 'react';

// model
import TotalSpending from 'model/totalspeding/TotalSpending';
import { tagList } from 'model/item/Tag';

// view
import FinguHorizontoalBar from 'common/component/chart/FinguHorizontalBar';

interface TotalSpedingStatusViewProps {
  totalSpending: TotalSpending;
  isAfterAdjust: boolean;
}

class TotalSpedingStatusView extends Component<
  TotalSpedingStatusViewProps,
  {}
> {
  render() {
    const { totalSpending } = this.props;
    if (totalSpending === undefined) return null;
    return (
      <div>
        {this.renderStatusTable()}
        <FinguHorizontoalBar
          labels={['저축투자', '지출합계', '미파악지출']}
          data={this.getChartData()}
          backgroundColor={['#0088FE', '#00C49F', '#FFBB28']}
          hoverBackgroundColor={['#0088FE', '#00C49F', '#FFBB28']}
        />
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
                <td>{tag}</td>
                <td>{totalSpending[tag]}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
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
