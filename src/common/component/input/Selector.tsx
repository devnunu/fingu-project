import React, { Component } from 'react';
import classNames from 'classnames';

import styles from './Selector.scss';

interface SelectorProps {
  items: string[];
  className?: string;
  onChange: (event) => void;
}

interface SelectorState {
  selValue: string;
}

class Selector extends Component<SelectorProps, SelectorState> {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      selValue: props.items[0]
    };
  }

  render() {
    const { items } = this.props;
    const { selValue } = this.state;
    return (
      <div className={classNames(styles.container, this.props.className)}>
        <select className={styles.selector} onChange={this.props.onChange}>
          {items.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>
        <i className='fa fa-angle-down' />
      </div>
    );
  }
}

export default Selector;
