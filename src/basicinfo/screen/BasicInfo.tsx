import React,{ Component } from 'react';
import classNames from 'classnames';

import User from '../../model/user/User';
import UserController from '../../controller/UserController';

// view
import Button from '../../common/component/button/Button';
import Input from '../../common/component/input/Input';

import styles from './BasicInfo.scss';

interface BasicInfoState {
  user: User;
}

class BasicInfo extends Component<{}, BasicInfoState> {
  constructor(props) {
    super(props);
    this.state = {
      user: new User()
    };
  }

  render() {
    const { user } = this.state;
    return (
      <div
        className={styles.mainScreen}
        style={{ background: require('common/assets/images/main_bg.jpg') }}
      >
        <div className={classNames(styles.container)}>
          <div className={styles.title}>
            당신의 금융친구 <span>FINGU</span>
          </div>
          <Input
            className={styles.nameInput}
            label="이름"
            type="text"
            value={user.name}
            onChange={this.onChangeUsername.bind(this)}
          />
          <Input
            className={styles.ageInput}
            label="월 단위 예산/수입"
            type="number"
            value={user.budget}
            onChange={this.onChangeUserAge.bind(this)}
          />
          <Button onClick={this.onClickSubmitButton.bind(this)} text="확인" />
        </div>
      </div>
    );
  }

  private onClickSubmitButton(): void {
    const { user } = this.state;
    if (this.vaildInput()) {
      user.dataSubmited = true;
      UserController.setUser(user);
    } else {
      alert('모든값을 입력해 주세요!');
    }
  }

  private onChangeUsername(event): void {
    const { user } = this.state;
    user.name = event.target.value;
    this.setState({ ...this.state, user });
  }

  private onChangeUserAge(event): void {
    const { user } = this.state;
    user.budget = parseInt(event.target.value);
    this.setState({ ...this.state, user });
  }

  private vaildInput(): boolean {
    const { user } = this.state;
    return user.name !== undefined && user.budget !== undefined;
  }
}

export default BasicInfo;
