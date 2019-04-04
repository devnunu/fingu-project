import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import Container from 'common/component/container/Container';

// style
import styles from './Nav.scss';

class Nav extends Component<{}, {}> {
  render() {
    return (
      <div className={styles.container}>
        <Container>
          <Link to={`/`} className={styles.title}>
            FINGU
          </Link>
          <ul>
            <li>
              <Link to={`/`}>통장</Link>
            </li>
            <li>
              <Link to={`/analysis`}>분석</Link>
            </li>
            <li>
              <Link to={`/adjust`}>조정</Link>
            </li>
          </ul>
        </Container>
      </div>
    );
  }
}

export default Nav;
