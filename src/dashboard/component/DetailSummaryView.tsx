import React, { Component } from 'react';

// model
import Account from 'model/account/Account';

// style
import styles from './DetailSummaryView.scss';

interface DetailSummaryViewProps {
  account: Account;
}

class DetailSummaryView extends Component<DetailSummaryViewProps, {}> {
  render() {
    const { account } = this.props;
    return (
      <div>
        <div>{account.name}</div>
      </div>
    );
  }
}

export default DetailSummaryView;
