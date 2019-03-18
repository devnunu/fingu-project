import React, { Component } from 'react';
import classNames from 'classnames';

import styles from './Container.scss';

interface ContainerProps {
  className?: string;
}

class Container extends Component<ContainerProps, {}> {
  render() {
    return (
      <div className={classNames(styles.container, this.props.className)}>
        {this.props.children}
      </div>
    );
  }
}

export default Container;
