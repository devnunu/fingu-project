import React, { Component } from 'react';
import classNames from 'classnames';

import styles from './InputTagSelector.scss';

interface InputTagSelectorProps {
  onSelected: (tag: string) => void;
  className?: string;
  selTag: string;
  tagList: string[];
  label?: string;
}

class InputTagSelector extends Component<InputTagSelectorProps, {}> {
  render() {
    const { tagList, selTag } = this.props;
    return (
      <div className={classNames(styles.container, this.props.className)}>
        <p className={styles.label}>{this.props.label}</p>
        <div className={styles.tagList}>
          {tagList.map((tag, index) => {
            return (
              <div
                key={index}
                onClick={event => this.props.onSelected(tag)}
                className={classNames(styles.tag, {
                  [styles.selTag]: tag === selTag
                })}
              >
                {tag}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default InputTagSelector;
