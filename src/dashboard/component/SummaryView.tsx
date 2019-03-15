import React from "react";
import { Component } from "react";

import User from "../../model/user/User";

// style
import styles from "./SummaryView.scss";

interface SummaryViewProps {
  user: User;
}

class SummaryView extends Component<SummaryViewProps, {}> {
  render() {
    const { user } = this.props;
    console.log("user", user);
    return (
      <div>
        <div>
          <span>이름</span>
          {user.name}
        </div>
        <div>
          <span>나이</span>
          {user.age}
        </div>
        <div>
          <span>수입</span>
          <span>{user.getTotalIncome()}</span>
        </div>
        <div>
          <span>지출</span>
          <span>{user.getTotalSpending()}</span>
        </div>
      </div>
    );
  }
}

export default SummaryView;
