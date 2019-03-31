import React, { Component } from 'react';
import Modal from 'react-modal';

// model
import Account from 'model/account/Account';

// view
import Input from 'common/component/input/Input';
import Button from 'common/component/button/Button';

// util
import StringUtil from 'common/utils/StringUtil';

// style
import styles from './AccountInputModal.scss';

interface AccountInputModalProps {
  modalOpen: boolean;
  title: string;
  description: string;
  parentAccount: Account;
  onClickSubmit: (account: Account) => void;
  onRequestClose: () => void;
}

interface AccountInputModalState {
  account: Account;
}

class AccountInputModal extends Component<
  AccountInputModalProps,
  AccountInputModalState
> {
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
  constructor(props) {
    super(props);
    this.state = {
      account: props.parentAccount
    };
  }

  render() {
    const { title, description, modalOpen } = this.props;
    const { account } = this.state;
    return (
      <Modal
        isOpen={modalOpen}
        onRequestClose={this.props.onRequestClose}
        className={styles.modal}
        style={this.customStyles}
      >
        <div className={styles.title}>{title}</div>
        <div className={styles.description}>{description}</div>
        <Input
          className={styles.input}
          label={'계좌 이름'}
          type={'text'}
          value={account == undefined ? '' : account.name}
          onChange={this.onChangeAccountName.bind(this)}
        />
        <Input
          className={styles.input}
          label={'초기 잔액'}
          type={'number'}
          value={account == undefined ? '' : account.balance}
          onChange={this.onChangeAccountBalance.bind(this)}
        />
        <div className={styles.submitButtonBox}>
          <Button text={'확인'} onClick={this.handleClickSubmit.bind(this)} />
        </div>
      </Modal>
    );
  }

  private onChangeAccountName(event): void {
    const { account } = this.state;
    account.name = event.target.value;
    this.setState({ ...this.state, account });
  }

  private onChangeAccountBalance(event): void {
    const { account } = this.state;
    account.balance = event.target.value;
    this.setState({ ...this.state, account });
  }

  private handleClickSubmit() {
    const { account } = this.state;
    StringUtil.isEmptyString(account.name) || account.balance === undefined
      ? alert('입력값을 작성해주세요')
      : this.props.onClickSubmit(account);
  }
}

export default AccountInputModal;
