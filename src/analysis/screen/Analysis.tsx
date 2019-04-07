import React, { Component, Fragment } from 'react';

// controller
import UserController from 'controller/UserController';

// model
import User from 'model/user/User';
import TotalSpending, {
  SpendingTagItems
} from 'model/totalspeding/TotalSpending';

// view
import Container from 'common/component/container/Container';
import AnalysisTableView from 'analysis/component/AnalysisTableView';
import SummaryTableView from 'analysis/component/SummaryTableView';

// styles
import styles from './Analysis.scss';

interface AnalysisState {
  user: User;
  totalSpending: TotalSpending;
}

class Analysis extends Component<{}, AnalysisState> {
  componentWillMount() {
    UserController.setUserListner(this.onFetchUser.bind(this));
    UserController.notifyUserListner();
  }

  componentWillUnmount() {
    UserController.deleteUserListner(this.onFetchUser);
  }

  onFetchUser(user: User) {
    const totalSpending = new TotalSpending(user);
    this.setState({
      ...this.state,
      user,
      totalSpending
    });
  }

  render() {
    const { user, totalSpending } = this.state;
    const totalIncome = user.budget * 12;
    const insuranceAmount = user.getSpendingByTag('부채상환');
    const deptAmount = user.getSpendingByTag('보험료');
    return (
      <Container className={styles.container}>
        <div className={styles.title}>
          <span>예산 분석</span>을 해봤어요.
        </div>
        <div className={styles.description}>
          <span>{user.name}</span>님의 분석 결과를 확인해보세요.
        </div>
        <AnalysisTableView
          className={styles.insuranceBox}
          totalIncome={totalIncome}
          compareValue={insuranceAmount}
          compareValueName={'보장성 보험료'}
          contentTitle={'소득대비 보장성보험료 비중'}
          contentDesc={
            '* 저축성보험을 제외한 모든 보장성보험에 대한 적정 보험료는 일반적으로 총 소득대비 7~10%사이가 적당하며, 초과하거나 부족할 경우 검토가 필요합니다'
          }
        />
        <AnalysisTableView
          className={styles.deptBox}
          totalIncome={totalIncome}
          compareValue={deptAmount}
          compareValueName={'부채상환총액'}
          contentTitle={'소득대비 부채상환 비중'}
          contentDesc={
            '* 부채상환비율은 일반적으로 총소득 대비 30% 미만을 권장.'
          }
        />
        <SummaryTableView className={styles.summaryTableBox} totalSpending={totalSpending} budget={user.budget} />
      </Container>
    );
  }
}

export default Analysis;
