import React from 'react';
import {Helmet} from "react-helmet";

import { connect } from 'dva'
import { withRouter } from 'dva/router'

import { BackTop } from 'antd'
import styles from './App.less';

import Sider from '../Sider/Sider'
const App = ({ children, dispatch, app, loading, location }) => {
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
export default withRouter(connect(({ app, loading }) => ({ app, loading }))(App))
