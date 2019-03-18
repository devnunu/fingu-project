import React, { Component } from 'react';
import classNames from 'classnames';

import styles from './Button.scss';

interface ButtonProps {
  onClick: (evnet) => void;
  text: string;
  className?: string;
}

class Button extends Component<ButtonProps, {}> {
  render() {
    return (
      <button
        className={classNames(this.props.className, styles.button)}
        onClick={this.props.onClick}
      >
        {this.props.text}
      </button>
    );
  }
}

export default Button;
