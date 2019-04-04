import React, { Component } from 'react';

// controller
import UserController from 'controller/UserController';

// model
import User from 'model/user/User';
import TotalSpending from 'model/totalspeding/TotalSpending';
import { tagList } from 'model/item/Tag';

// view
import Container from 'common/component/container/Container';
import TotalSpendingStatusView from 'adjust/component/TotalSpedingStatusView';

// util
import StringUtil from 'common/utils/StringUtil'

// styles
import styles from './Adjust.scss';

interface AdjustState {
  baseSpending: TotalSpending;
  adjustSpending: TotalSpending;
  totalSpendingAmount: number;
  budget: number;
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
    const totalSpending = user.getTotalSpendingObject();
    this.setState({
      ...this.state,
      baseSpending: totalSpending,
      adjustSpending: totalSpending,
      totalSpendingAmount: user.getTotalSpending(),
      budget: user.budget
    });
  }

  render() {
    const {
      baseSpending,
      adjustSpending,
      budget,
      totalSpendingAmount
    } = this.state;
    return (
      <Container className={styles.container}>
        <div className={styles.title}>
          한 달 예산을 <span>조정</span> 해볼게요.
        </div>
        <div className={styles.description}>
          항목을 꼼꼼히 살피고, 줄일수 있는 항목을 찾아봐요.
        </div>
        <div className={styles.budgetBox}>
            <div className={styles.budgetTitle}>
                유입합계
            </div>
            <div className={styles.budgetAmount}>
                {StringUtil.getCurrencyValue(budget)}원
            </div>
        </div>
        <div className={styles.beforeAdjustBox}>
          <TotalSpendingStatusView
            totalSpending={baseSpending}
            isAfterAdjust={false}
            budget={budget}
            totalSpendingAmount={totalSpendingAmount}
          />
        </div>
        <div className={styles.afterAdjustBox}>
          <TotalSpendingStatusView
            totalSpending={adjustSpending}
            isAfterAdjust={true}
            budget={budget}
            totalSpendingAmount={totalSpendingAmount}
          />
        </div>
        <div className={styles.descBox}>
          <div className={styles.descTitle}>가계지출 = 고정지출 + 변동지출</div>
          <div className={styles.descSubtitle}>
            가계지출은 일반적으로 총 소득 대비 <b>50%</b> 이하를 유지하는것이
            바람직합니다
          </div>
        </div>
      </Container>
    );
  }
}

export default Adjust;
