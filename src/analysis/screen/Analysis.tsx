import React, { Component } from 'react';

// controller
import UserController from 'controller/UserController';

// model
import User from 'model/user/User';

// view
import Container from 'common/component/container/Container';

// styles
import styles from './Analysis.scss';

interface AnalysisState {
  user: User;
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
    this.setState({ ...this.state, user });
  }

  render() {
    const { user } = this.state;
    return (
      <Container className={styles.container}>
        <div className={styles.title}>
          <span>예산 분석</span>을 해봤어요.
        </div>
        <div className={styles.description}>
          <span>{user.name}</span>님의 분석 결과를 확인해보세요.
        </div>
      </Container>
    );
  }
}

export default Analysis;
