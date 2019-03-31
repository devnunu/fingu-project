import React, { Component } from 'react';

import Account from '../../model/account/Account';
import Item from '../../model/item/Item';
import User from '../../model/user/User';
import UserController from '../../controller/UserController';

// view
import SummaryView from 'dashboard/component/SummaryView';
import AccountsView from 'dashboard/component/AccountsView';
import DetailView from 'dashboard/component/DetailView';
import ItemInputModal from 'common/component/modal/ItemInputModal';
import AccountInputModal from 'common/component/modal/AccountInputModal';

import styles from './Dashboard.scss';

interface DashboardState {
  user: User;
  selAccountIndex: number;
  isOpenAddItemModal: boolean;
  isOpenAddAccountModal: boolean;
  isOpenUpdateAccountModal: boolean;
}

class Dashboard extends Component<{}, DashboardState> {
  constructor(props) {
    super(props);
    this.state = {
      user: new User(),
      selAccountIndex: -1,
      isOpenAddItemModal: false,
      isOpenAddAccountModal: false,
      isOpenUpdateAccountModal: false
    };
  }

  componentWillMount() {
    UserController.setUserListner(this.onFetchUser.bind(this));
    UserController.notifyUserListner();
  }

  componentWillUnmount() {
    UserController.deleteUserListner(this.onFetchUser);
  }

  onFetchUser(user: User) {
    this.setState({ ...this.state, user });
  }

  render() {
    const {
      user,
      selAccountIndex,
      isOpenAddItemModal,
      isOpenAddAccountModal,
      isOpenUpdateAccountModal
    } = this.state;
    return (
      <div className={styles.container}>
        <SummaryView className={styles.summaryView} user={user} />
        <AccountsView
          accounts={user.accounts}
          selAccountIndex={selAccountIndex}
          totalAccountBalance={user.getTotalAccountsBalance()}
          onClickAddAccountModalOpen={this.onClickAddAccountModalOpen.bind(
            this
          )}
          onClickSelectAccount={this.onClickSelectAccount.bind(this)}
          onDeleteAccount={this.onDeleteAccount.bind(this)}
        />
        {selAccountIndex > -1 ? (
          <DetailView
            account={user.accounts[selAccountIndex]}
            onChangeAccount={this.onChangeAccount.bind(this)}
            onClickItemInputModalOpen={this.onClickItemInputModalOpen.bind(
              this
            )}
            onClickUpdateAccountModalOpen={this.onClickUpdateAccountModalOpen.bind(
              this
            )}
          />
        ) : null}
        {/* 아래는 전부 모달 */}
        {isOpenAddItemModal && (
          <ItemInputModal
            modalOpen={true}
            title={'내역 추가'}
            description={'소비 내역을 추가합니다'}
            onClickSubmit={this.onAddAccountItem.bind(this)}
            onRequestClose={this.onClickItemInputModalOpen.bind(this)}
          />
        )}
        {isOpenAddAccountModal && (
          <AccountInputModal
            title={'계좌 추가'}
            description={'새로운 계좌를 추가합니다'}
            baseAccount={this.getNewAccount()}
            modalOpen={true}
            onClickSubmit={this.onClickCreateAccount.bind(this)}
            onRequestClose={this.onClickAddAccountModalOpen.bind(this)}
          />
        )}
        {isOpenUpdateAccountModal && (
          <AccountInputModal
            title={'계좌 정보 수정'}
            description={'계좌 정보를 변경합니다'}
            baseAccount={user.accounts[selAccountIndex]}
            modalOpen={true}
            onClickSubmit={this.onChangeAccount.bind(this)}
            onRequestClose={this.onClickUpdateAccountModalOpen.bind(this)}
          />
        )}
      </div>
    );
  }

  // 소비 내역 추가 모달 오픈
  private onClickItemInputModalOpen() {
    this.setState({
      ...this.state,
      isOpenAddItemModal: !this.state.isOpenAddItemModal
    });
  }

  // 계좌 추가 모달 오픈
  private onClickAddAccountModalOpen() {
    this.setState({
      ...this.state,
      isOpenAddAccountModal: !this.state.isOpenAddAccountModal
    });
  }

  // 계좌 정보 업데이트 모달 오픈
  private onClickUpdateAccountModalOpen() {
    this.setState({
      ...this.state,
      isOpenUpdateAccountModal: !this.state.isOpenUpdateAccountModal
    });
  }

  // 소비 내역 추가
  private onAddAccountItem(item: Item) {
    const { user, selAccountIndex } = this.state;
    if (user.accounts[selAccountIndex].checkOveredBalance(item.amount)) {
      alert('정해진 잔액을 초과할 수 없습니다');
      return;
    }
    user.accounts[selAccountIndex].spendings.push(item);
    UserController.setUser(user);
  }

  // 계좌 추가
  private onClickCreateAccount(newAccount: Account): void {
    const { user } = this.state;
    if (user.checkOveredBudget(newAccount.balance)) {
      alert('정해진 예산을 초과할 수 없습니다');
      return;
    }

    user.accounts.push(newAccount);
    UserController.setUser(user);
  }

  // 새로운 계좌 획득
  private getNewAccount(): Account {
    const { user } = this.state;
    return user.accounts.length > 0
      ? new Account(user.accounts[user.accounts.length - 1].id + 1)
      : new Account(1);
  }

  // 계좌 삭제
  private onDeleteAccount(index: number): void {
    const { user } = this.state;
    user.accounts.splice(index, 1);
    UserController.setUser(user);
  }

  // 계좌 선택 시
  private onClickSelectAccount(selAccountIndex: number): void {
    this.setState({ ...this.state, selAccountIndex });
  }

  // 계좌 정보 변경
  private onChangeAccount(newAccount: Account) {
    const { user, selAccountIndex } = this.state;
    if (user.checkOveredBudget(newAccount.balance, selAccountIndex)) {
      alert('정해진 예산을 초과할 수 없습니다');
      return;
    }
    user.accounts[selAccountIndex].name = newAccount.name;
    user.accounts[selAccountIndex].balance = newAccount.balance;
    UserController.setUser(user);
  }
}

export default Dashboard;
