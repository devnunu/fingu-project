import React, { Component, Fragment } from 'react';
import { Table, Icon } from 'semantic-ui-react';

// model
import Item from 'model/item/Item';

// style
import styles from './HistoryTable.scss';

interface HistoryTableProps {
  title: string;
  className?: string;
  items: Item[];
}

class HistoryTable extends Component<HistoryTableProps, {}> {
  render() {
    const { title, items } = this.props;
    return (
      <div className={this.props.className}>
        <div className={styles.title}>{title}</div>
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell textAlign={'center'}>항목</Table.HeaderCell>
              <Table.HeaderCell textAlign={'center'}>금액</Table.HeaderCell>
              <Table.HeaderCell textAlign={'center'}>변경</Table.HeaderCell>
              <Table.HeaderCell textAlign={'center'}>삭제</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>{items.map(item => this.renderTableRow(item))}</Table.Body>
          <Table.Footer>
            <Table.HeaderCell positive colSpan={2}>
              {title} 합계
            </Table.HeaderCell>
            <Table.HeaderCell positive colSpan={2} textAlign={'right'} className={styles.value}>
              {items.reduce((pre, post) => pre + post.amount, 0)} 원
            </Table.HeaderCell>
          </Table.Footer>
        </Table>
      </div>
    );
  }

  renderTableRow(item: Item) {
    return (
      <Table.Row>
        <Table.Cell textAlign={'center'}>{item.name}</Table.Cell>
        <Table.Cell textAlign={'right'}>{item.amount} 원</Table.Cell>
        <Table.Cell textAlign={'center'}>
          <Icon name="pencil alternate" size="large" />
        </Table.Cell>
        <Table.Cell textAlign={'center'}>
          <Icon name="trash alternate" size="large" />
        </Table.Cell>
      </Table.Row>
    );
  }
}

export default HistoryTable;
