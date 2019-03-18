import * as React from 'react';
import { Component } from 'react';

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
    return (
      <div className={styles.container}>
        <Input
          className={styles.nameInput}
          label="이름"
          type="text"
          onChange={this.onChangeUsername.bind(this)}
        />
        <Input
          className={styles.ageInput}
          label="나이"
          type="number"
          onChange={this.onChangeUserAge.bind(this)}
        />
        <Button onClick={this.onClickSubmitButton.bind(this)} text="확인" />
      </div>
    );
  }

  private onClickSubmitButton(): void {
    const { user } = this.state;
    user.dataSubmited = true;
    UserController.setUser(this.state.user);
  }

  private onChangeUsername(event) {
    const { user } = this.state;
    user.name = event.target.value;
    this.setState({ ...this.state, user });
  }

  private onChangeUserAge(event) {
    const { user } = this.state;
    user.age = parseInt(event.target.value);
    this.setState({ ...this.state, user });
  }
}

export default BasicInfo;
