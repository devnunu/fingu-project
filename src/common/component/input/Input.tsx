import React, { Component } from 'react';
import classNames from 'classnames';

import styles from './Input.scss';

interface InputProps {
  onChange: (event) => void;
  className?: string;
  label: string;
  type: string;
}

class Input extends Component<InputProps, {}> {
  render() {
    return (
      <div className={classNames(styles.container, this.props.className)}>
        <p className={styles.label}>{this.props.label}</p>
        <input
          className={styles.input}
          type={this.props.type}
          onChange={this.props.onChange}
        />
      </div>
    );
  }
}

export default Input;
