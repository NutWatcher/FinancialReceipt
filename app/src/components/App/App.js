import React, {Component} from 'react';
import {Helmet} from "react-helmet";

import { connect } from 'dva'
import { withRouter } from 'dva/router'

import { BackTop, message } from 'antd'
import styles from './App.less';

import Sider from '../Sider/Sider'

class App extends Component {
  componentWillReceiveProps(nextProps){
    if (nextProps.globe.success != ""){
      message.success(nextProps.globe.success);
      nextProps.dispatch({
        type: 'globe/showSuccess',
        success: "",
      });
    }
  }
  render () {
    const { children, globe, dispatch, app, loading, location } = this.props;
    return (
      <div>
        <Helmet>
          <title>财务发票系统</title>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          {/*<link rel="icon" href={logo} type="image/x-icon" />*/}
        </Helmet>
        <div >
          {/*{!isNavbar ? <aside className={classnames(styles.sider, { [styles.light]: !darkTheme })}>*/}
          {/*{siderProps.menu.length === 0 ? null : <Sider {...siderProps} />}*/}
          {/*</aside> : ''}*/}
          <aside className={styles.sider}>
            <Sider />
          </aside>

          <div className={styles.main} id="mainContainer">
            <BackTop target={() => document.getElementById('mainContainer')} />
            {/*<Header {...headerProps} />*/}
            {/*<Bread {...breadProps} />*/}
            <div className={styles.container}>
              <div className={styles.content}>
                {children}
              </div>
            </div>
            {/*<Footer />*/}
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(
  connect(
    (state) => {
      const { app, loading, globe } = state;
      return { app, loading, globe };
    }
  )(App)
)
