import React, { Component } from 'react';
import Modal from 'react-modal';

// model
import Item from 'model/item/Item';
import { tagList } from 'model/item/Tag';

// view
import Input from 'common/component/input/Input';
import Button from 'common/component/button/Button';
import InputTagSelector from 'common/component/input/InputTagSelector';

// util
import StringUtil from 'common/utils/StringUtil';

// style
import styles from './AccountInputModal.scss';

interface ItemInputModalProps {
  modalOpen: boolean;
  title: string;
  description: string;
  baseItem?: Item;
  onClickSubmit: (item: Item) => void;
  onRequestClose: () => void;
}

interface ItemInputModalState {
  item: Item;
}

class ItemInputModal extends Component<
  ItemInputModalProps,
  ItemInputModalState
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
      ...this.state,
      item: props.baseItem != undefined ? props.baseItem : new Item()
    };
  }

  render() {
    const { title, description, modalOpen } = this.props;
    const { item } = this.state;
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
          label={'내역명'}
          type={'text'}
          value={item.name}
          onChange={this.onChangeItemName.bind(this)}
        />
        <Input
          className={styles.input}
          label={'금액'}
          type={'number'}
          value={item.amount}
          onChange={this.onChangeItemBalance.bind(this)}
        />
        <InputTagSelector
          label={'태그'}
          tagList={tagList}
          selTag={item.tag}
          onSelected={this.onSelectedTag.bind(this)}
        />
        <div className={styles.submitButtonBox}>
          <Button text={'확인'} onClick={this.handleClickSubmit.bind(this)} />
        </div>
      </Modal>
    );
  }

  private onChangeItemName(event): void {
    const { item } = this.state;
    item.name = event.target.value;
    this.setState({ ...this.state, item });
  }

  private onChangeItemBalance(event): void {
    const { item } = this.state;
    item.amount = parseInt(event.target.value);
    this.setState({ ...this.state, item });
  }

  private onSelectedTag(tag: string): void {
    const { item } = this.state;
    item.tag = tag;
    this.setState({ ...this.state, item });
  }

  private handleClickSubmit() {
    const { item } = this.state;
    if (StringUtil.isEmptyString(item.name) || item.amount === undefined) {
      alert('모든 값을 입력해주세요');
    } else {
      this.props.onClickSubmit(item);
      this.props.onRequestClose();
    }
  }
}

export default ItemInputModal;
