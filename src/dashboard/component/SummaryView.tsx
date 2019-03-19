import React, { Component } from 'react';
import classNames from 'classnames';
import StringUtil from 'common/utils/StringUtil';

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
          안녕하세요 <span>{user.name}</span>님! 통장을 분리해서 합리적인 소비생활을 시작해볼까요?
        </div>
        <div className={styles.status}>
          <div className={styles.incomeSection}>
            <p className={styles.incomeLabel}>수입</p>
            <div className={styles.income}>
              <text>{StringUtil.getCurrencyValue(user.getTotalIncome())}</text>
              &nbsp;원
            </div>
          </div>
          <div className={styles.spendingSection}>
            <p className={styles.spendingLabel}>지출</p>
            <div className={styles.spending}>
              <text>{StringUtil.getCurrencyValue(user.getTotalSpending())}</text>
              &nbsp;원
            </div>
          </div>
        </div>
      </Container>
    );
  }
}

export default SummaryView;
