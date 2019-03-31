import React, { Component } from 'react';

// styles
import styles from './EmptyView.scss';

interface EmptyViewProps {
  label: string;
}

class EmptyView extends Component<EmptyViewProps, {}> {
  render() {
    const { label } = this.props;

    return (
      <div className={styles.emptyAccountBox}>
        <div className={styles.title}>앗, 아직 {label} 등록이 되지않으셨군요!</div>
        <br />
        우측 상단의 <span>{label} 추가</span>를 눌러주세요.
      </div>
    );
  }
}

export default EmptyView;
