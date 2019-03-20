import React, { Component, Fragment } from 'react';

// model
import Item from 'model/item/Item';

interface HistoryTableProps {
  title: string;
  items: Item[];
}

class HistoryTable extends Component<HistoryTableProps, {}> {
  render() {
    const { title, items } = this.props;
    return (
      <div>
        <div>{title}</div>

        <table>
          <tbody>
            {items.map(item => this.renderTableRow(item))}
            <tr>
              <th>{title} 합계</th>
              <th>{items.reduce((pre, post) => pre + post.amount, 0)} 원</th>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

  renderTableRow(item: Item) {
    return (
      <tr>
        <th>{item.name}</th>
        <th>{item.amount} 원</th>
      </tr>
    );
  }
}

export default HistoryTable;
