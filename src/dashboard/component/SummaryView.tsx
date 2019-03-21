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
    return (
      <Container className={styles.containter}>
        <div className={styles.title}>
          당신의 금융친구 <span>Fingu</span>
        </div>
        <div className={styles.description}>
          안녕하세요 <span>{user.name}</span>님! 통장을 분리해서 합리적인 소비생활을 시작해볼까요?
        </div>
        <div>
          <div className={styles.status}>
            <div className={styles.incomeSection}>
              <div className={styles.income}>
                <span>{StringUtil.getCurrencyValue(user.getTotalIncome())}</span>
                &nbsp;원
              </div>
              <p className={styles.incomeLabel}>수입</p>
            </div>
            <div className={styles.spendingSection}>
              <div className={styles.spending}>
                <span>{StringUtil.getCurrencyValue(user.getTotalSpending())}</span>
                &nbsp;원
              </div>
              <p className={styles.spendingLabel}>지출</p>
            </div>
          </div>
          <FinguPieChart
            className={styles.summaryChart}
            labels={['소비', '저축투자', '지출', '미파악지출']}
            data={[300, 50, 100, 200]}
          />
        </div>
      </Container>
    );
  }
}

export default SummaryView;
