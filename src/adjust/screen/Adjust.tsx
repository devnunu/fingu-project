import React, { Component } from 'react';

// controller
import UserController from 'controller/UserController';

// model
import User from 'model/user/User';
import TotalSpending from 'model/totalspeding/TotalSpending';

// view
import Container from 'common/component/container/Container';
import TotalSpendingStatusView from 'adjust/component/TotalSpedingStatusView';
import Button from 'common/component/button/Button';
import AdjustSpendingModal from 'adjust/component/AdjustSpendingModal';

// util
import StringUtil from 'common/utils/StringUtil';

// styles
import styles from './Adjust.scss';

interface AdjustState {
  baseSpending: TotalSpending;
  adjustSpending: TotalSpending;
  budget: number;
  isAdjustModalOpen: boolean;
}

class Adjust extends Component<{}, AdjustState> {
  componentWillMount() {
    UserController.setUserListner(this.onFetchUser.bind(this));
    UserController.notifyUserListner();
  }

  componentWillUnmount() {
    UserController.deleteUserListner(this.onFetchUser);
  }

  onFetchUser(user: User) {
    // 변수 생성 후 대입하면 참조값이 복사되므로 각각의 인스턴스를 생성한다.
    this.setState({
      ...this.state,
      baseSpending: new TotalSpending(user),
      adjustSpending: new TotalSpending(user),
      budget: user.budget,
      isAdjustModalOpen: false
    });
  }

  render() {
    const { baseSpending, adjustSpending, budget } = this.state;
    return (
      <Container className={styles.container}>
        <div className={styles.headerBox}>
          <div className={styles.title}>
            한 달 예산을 <span>조정</span> 해볼게요.
          </div>
          <div className={styles.description}>
            항목을 꼼꼼히 살피고, 줄일수 있는 항목을 찾아봐요.
          </div>
        </div>
        <div className={styles.buttonAdjustBox}>
          <Button
            text="조정하기"
            onClick={this.onClickAdjustModalOpenButton.bind(this)}
          />
        </div>
        <div className={styles.budgetBox}>
          <div className={styles.budgetTitle}>유입합계</div>
          <div className={styles.budgetAmount}>
            {StringUtil.getCurrencyValue(budget)}원
          </div>
        </div>
        <div className={styles.beforeAdjustBox}>
          <TotalSpendingStatusView
            totalSpending={baseSpending}
            isAfterAdjust={false}
            budget={budget}
          />
        </div>
        <div className={styles.afterAdjustBox}>
          <TotalSpendingStatusView
            totalSpending={adjustSpending}
            isAfterAdjust={true}
            budget={budget}
          />
        </div>
        <div className={styles.descBox}>
          <div className={styles.descTitle}>가계지출 = 고정지출 + 변동지출</div>
          <div className={styles.descSubtitle}>
            가계지출은 일반적으로 총 소득 대비 <b>50%</b> 이하를 유지하는것이
            바람직합니다
          </div>
        </div>
        <AdjustSpendingModal
          title={'소비 조정 하기'}
          description={'소비 내역을 조정해봐요'}
          modalOpen={this.state.isAdjustModalOpen}
          totalSpending={adjustSpending}
          budget={budget}
          onRequestClose={this.onClickAdjustModalOpenButton.bind(this)}
          onClickSubmit={this.onClickAdjustSubmitButton.bind(this)}
        />
      </Container>
    );
  }

  private onClickAdjustSubmitButton(newTotalSpending: TotalSpending) {
    const { adjustSpending } = this.state;
    this.setState({ ...this.state, adjustSpending: newTotalSpending });
  }

  private onClickAdjustModalOpenButton() {
    this.setState({
      ...this.state,
      isAdjustModalOpen: !this.state.isAdjustModalOpen
    });
  }
}

export default Adjust;
