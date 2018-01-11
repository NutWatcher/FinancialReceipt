import React, { Component } from 'react';
import styles from './Page.less';

export default class Page extends Component {
  render () {
    const { children } = this.props;
    return (
      <div className={styles.page_wrap}>
        {children}
      </div>
    )
  }
}
