import React, { Component } from 'react';
import classNames from 'classnames';
import { Icon } from 'semantic-ui-react';

// model
import Account from 'model/account/Account';
import Item from 'model/item/Item';

// util
import StringUtil from 'common/utils/StringUtil';

// view
import Container from 'common/component/container/Container';
import EmptyView from 'common/component/view/EmptyView';
import DetailSummaryView from 'dashboard/component/DetailSummaryView';

// style
import styles from './DetailView.scss';

interface DetailViewProps {
  account: Account;
  selItemIndex: number;
  onChangeAccount: (account: Account) => void;
  onDeleteItem: (index: number) => void;
  onClickItem: (index: number) => void;
  onClickItemInputModalOpen: () => void;
  onClickUpdateItemModalOpen: () => void;
  onClickUpdateAccountModalOpen: () => void;
}

class DetailView extends Component<DetailViewProps, {}> {
  render() {
    const { account } = this.props;
    return (
      <Container className={styles.container}>
        <DetailSummaryView
          className={styles.summaryView}
          account={account}
          onClickItemInputModalOpen={this.props.onClickItemInputModalOpen}
          onClickUpdateAccountModalOpen={
            this.props.onClickUpdateAccountModalOpen
          }
        />
        {account.spendings.length === 0 ? (
          <EmptyView label={'내역'} />
        ) : (
          this.renderItemList(account.spendings)
        )}
      </Container>
    );
  }

  private renderItemList(spendings: Item[]) {
    const { selItemIndex } = this.props;
    return (
      <div className={styles.itemListSection}>
        <div className={styles.itemListHeader}>
          <div className={classNames(styles.tag, styles.header)}>태그</div>
          <div className={classNames(styles.name, styles.header)}>내역</div>
          <div className={classNames(styles.amount, styles.header)}>금액</div>
        </div>
        {spendings.map((spending, index) => {
          return (
            <div
              className={classNames(styles.itemList, {
                [styles.selected]: selItemIndex === index
              })}
              onClick={() =>
                selItemIndex === index ? null : this.props.onClickItem(index)
              }
              key={index}
            >
              <div className={styles.tag}>{spending.tag}</div>
              <div className={styles.name}>{spending.name}</div>
              <div className={styles.amount}>
                {StringUtil.getCurrencyValue(spending.amount)}원
              </div>
              <div
                onClick={() => this.props.onClickUpdateItemModalOpen()}
                className={styles.edit}
              />
              <div
                onClick={() => this.props.onDeleteItem(index)}
                className={styles.delete}
              />
            </div>
          );
        })}
      </div>
    );
  }
}

export default DetailView;
