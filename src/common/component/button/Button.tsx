import React, { Component } from 'react';

import styles from './Button.scss';

interface ButtonProps {
  onClick: (evnet) => void;
  text: string;
}

class Button extends Component<ButtonProps, {}> {
  render() {
    return (
      <button className={styles.button} onClick={this.props.onClick}>
        {this.props.text}
      </button>
    );
  }
}

export default Button;
