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

// styles
import styles from './Adjust.scss';

interface AdjustState {
  baseSpending: TotalSpending;
  adjustSpending: TotalSpending;
  selected;
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
      adjustSpending: totalSpending
    });
  }

  render() {
    const { baseSpending, adjustSpending } = this.state;
    return (
      <Container className={styles.container}>
        <div className={styles.title}>
          한 달 예산을 <span>조정</span> 해볼게요.
        </div>
        <div className={styles.description}>
          항목을 꼼꼼히 살피고, 줄일수 있는 항목을 찾아봐요.
        </div>
        <div className={styles.beforeAdjustBox}>
          <TotalSpendingStatusView
            totalSpending={baseSpending}
            isAfterAdjust={false}
          />
        </div>
        <div className={styles.afterAdjustBox}>
          <TotalSpendingStatusView
            totalSpending={adjustSpending}
            isAfterAdjust={true}
          />
        </div>
      </Container>
    );
  }
}

export default Adjust;
