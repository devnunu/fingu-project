import React, { Component } from 'react';
import Modal from 'react-modal';

// view
import Input from 'common/component/input/Input';
import Button from 'common/component/button/Button';

// util
import StringUtil from 'common/utils/StringUtil';

// style
import styles from './SingleInputModal.scss';

interface SingleInputModalProps {
  modalOpen: boolean;
  title: string;
  description: string;
  inputType?: string;
  onClickSubmit: (input: string) => void;
  onRequestClose: () => void;
}

interface SingleInputModalState {
  inputValue: string;
}

class SingleInputModal extends Component<
  SingleInputModalProps,
  SingleInputModalState
> {
  private customStyles = {
    content: {
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
      inputValue: ''
    };
  }

  render() {
    const { title, description, inputType, modalOpen } = this.props;
    const { inputValue } = this.state;
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
          type={inputType || 'text'}
          value={inputValue}
          onChange={this.onChangeInputValue.bind(this)}
        />
        <Button text={'확인'} onClick={this.handleClickSubmit.bind(this)} />
      </Modal>
    );
  }

  private onChangeInputValue(event): void {
    const inputValue = event.target.value;
    this.setState({ ...this.state, inputValue });
  }

  private handleClickSubmit() {
    const { inputValue } = this.state;
    StringUtil.isEmptyString(inputValue)
      ? alert('입력값을 작성해주세요')
      : this.props.onClickSubmit(inputValue);
  }
}

export default SingleInputModal;
