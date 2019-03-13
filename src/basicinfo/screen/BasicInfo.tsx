import React, { Component } from "react";

import User from "../../model/user/User";
import UserController from "../../controller/UserController";

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
      <div>
        <div>
          <span>이름</span>
          <input onChange={this.onChangeUsername.bind(this)} />
        </div>
        <div>
          <span>나이</span>
          <input onChange={this.onChangeUserAge.bind(this)} />
        </div>
        <button onClick={this.onClickSubmitButton.bind(this)}>확인</button>
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
