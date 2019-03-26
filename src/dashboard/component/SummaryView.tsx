import React, { Component } from 'react';
import classNames from 'classnames';
import StringUtil from 'common/utils/StringUtil';

// model
import User from '../../model/user/User';

// view
import Container from '../../common/component/container/Container';
import FinguPieChart from 'common/component/chart/FinguPieChart';

// style
import styles from './SummaryView.scss';

interface SummaryViewProps {
  className?: string;
  user: User;
}

class SummaryView extends Component<SummaryViewProps, {}> {
  render() {
    const { user } = this.props;
    const totalSpending = user.getTotalSpending();

    return (
      <Container className={styles.containter}>
        <div className={styles.title}>
          당신의 금융친구 <span>Fingu</span>
        </div>
        <div className={styles.description}>
          안녕하세요 <span>{user.name}</span>님! 통장을 분리해서 합리적인
          소비생활을 시작해볼까요?
        </div>
        <div>
          <div className={styles.status}>
            <div className={styles.incomeSection}>
              <div className={styles.income}>
                <span>{StringUtil.getCurrencyValue(user.budget)}</span>
                &nbsp;원
              </div>
              <p className={styles.incomeLabel}>예산</p>
            </div>
            <div className={styles.spendingSection}>
              <div className={styles.spending}>
                <span>{StringUtil.getCurrencyValue(totalSpending)}</span>
                &nbsp;원
              </div>
              <p className={styles.spendingLabel}>지출</p>
            </div>
          </div>
          <FinguPieChart
            className={styles.summaryChart}
            labels={['지출', '미파악지출']}
            data={[totalSpending, user.budget - totalSpending]}
            backgroundColor={['#00C49F', '#9c9c9c']}
            hoverBackgroundColor={['#00C49F', '#9c9c9c']}
          />
        </div>
      </Container>
    );
  }
}

export default SummaryView;
