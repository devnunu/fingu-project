import React, { Component } from 'react';
import Modal from 'react-modal';

// model
import TotalSpending, {
  SpendingTagItems
} from 'model/totalspeding/TotalSpending';
import { tagList } from 'model/item/Tag';

// util
import StringUtil from 'common/utils/StringUtil';

// view
import Button from 'common/component/button/Button';

// styles
import styles from './AdjustSpendingModal.scss';

interface AdjustSpendingModalProps {
  modalOpen: boolean;
  title: string;
  description: string;
  totalSpending: TotalSpending;
  budget: number;
  onClickSubmit: (newTotalSpending: TotalSpending) => void;
  onRequestClose: () => void;
}

interface AdjustSpendingModalState {
  copiedTotalSpending: TotalSpending;
}

class AdjustSpendingModal extends Component<
  AdjustSpendingModalProps,
  AdjustSpendingModalState
> {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      copiedTotalSpending: props.totalSpending
    };
  }
  private customStyles = {
    content: {
      width: '420px',
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)'
    }
  };
  render() {
    const { modalOpen, title, description } = this.props;
    const { copiedTotalSpending } = this.state;
    return (
      <Modal
        isOpen={modalOpen}
        visible={modalOpen}
        onRequestClose={this.props.onRequestClose}
        className={styles.modal}
        style={this.customStyles}
      >
        <div className={styles.title}>{title}</div>
        <div className={styles.description}>{description}</div>
        {this.renderStatusTable()}
        <div className={styles.submitBottonBox}>
          <Button text={'확인'} onClick={this.handleClickSubmit.bind(this)} />
        </div>
      </Modal>
    );
  }

  private renderStatusTable() {
    const { budget } = this.props;
    const { copiedTotalSpending } = this.state;
    return (
      <table>
        <tbody>
          {tagList.map((tag, index) => {
            return (
              <tr key={index}>
                <td className={styles.tableRowKey}>{tag}</td>
                <td className={styles.tableRowValue}>
                  <input
                    type="number"
                    onChange={event => this.onChangeAmount(event, tag)}
                    value={copiedTotalSpending.spendingTagItems[tag]}
                  />
                </td>
              </tr>
            );
          })}
          <tr>
            <td className={styles.tableRowKey}>미파악지출</td>
            <td className={styles.tableRowValue}>
              {StringUtil.getCurrencyValue(
                budget - copiedTotalSpending.getTotalSpendingSummary()
              )}
              원
            </td>
          </tr>
          <tr>
            <td className={styles.tableRowKey}>합계</td>
            <td className={styles.tableRowValue}>
              {StringUtil.getCurrencyValue(budget)}원
            </td>
          </tr>
        </tbody>
      </table>
    );
  }

  private handleClickSubmit() {
    const { budget } = this.props;
    const { copiedTotalSpending } = this.state;
    if (0 > budget - copiedTotalSpending.getTotalSpendingSummary()) {
      alert('지출이 예산을 초과 할 수 없습니다.');
      return;
    }
    this.props.onClickSubmit(this.state.copiedTotalSpending);
    this.props.onRequestClose();
  }

  private onChangeAmount(event, tag: string) {
    const { copiedTotalSpending } = this.state;
    const amount = parseInt(event.target.value);
    copiedTotalSpending.spendingTagItems[tag] = amount;
    this.setState({ ...this.state, copiedTotalSpending });
  }
}

export default AdjustSpendingModal;
