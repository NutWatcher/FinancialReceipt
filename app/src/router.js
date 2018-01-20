import React from 'react';
import { Router, Route, Switch, Redirect } from 'dva/router';
import dynamic from 'dva/dynamic'
import App from './components/App/App'
import Welcome from './routes/Welcome';
import BillManage from './routes/BillManage/index';

const Routers = function ({ history, app }) {
  return (
    <Router history={history}>
      <App>
        <Switch>
          <Route exact path="/" render={() => (<Redirect to="/Welcome" />)} />
          <Route path="/Welcome" exact component={Welcome} />
          <Route path="/billManage" exact component={BillManage} />
        </Switch>
      </App>
    </Router>
  )
};
//export default RouterConfig;
export default Routers;
