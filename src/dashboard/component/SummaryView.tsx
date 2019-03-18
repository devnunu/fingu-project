import React, { Component } from 'react';
import classNames from 'classnames';

// model
import User from '../../model/user/User';

// view
import Container from '../../common/component/container/Container';

// style
import styles from './SummaryView.scss';

interface SummaryViewProps {
  className?: string;
  user: User;
}

class SummaryView extends Component<SummaryViewProps, {}> {
  render() {
    const { user } = this.props;
    return (
      <Container className={styles.containter}>
        <div className={styles.title}>
          당신의 금융친구 <span>Fingu</span>
        </div>
        <div className={styles.description}>
          안녕하세요 <span>{user.name}</span>님! 통장을 분리해서 합리적인
          소비생활을 시작해볼까요?
        </div>
        <div className={styles.status}>
          <div className={styles.incomeSection}>
            <p className={styles.incomeLabel}>수입</p>
            <div>
              <span className={styles.income}>{user.getTotalIncome()}</span>
              <span className={styles.unit}>원</span>
            </div>
          </div>
          <div className={styles.spendingSection}>
            <p className={styles.spendingLabel}>지출</p>
            <div>
              <span className={styles.spending}>{user.getTotalSpending()}</span>
              <span className={styles.unit}>원</span>
            </div>
          </div>
        </div>
      </Container>
    );
  }
}

export default SummaryView;
