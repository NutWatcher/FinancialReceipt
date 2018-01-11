import React from 'react';
import { Router, Route, Switch, Redirect } from 'dva/router';
import dynamic from 'dva/dynamic'
import App from './components/App/App'

import IndexPage from './routes/IndexPage';
import Products from './routes/Products';
import BillManage from './routes/BillManage/index';
// function RouterConfig({ history }) {
//   return (
//     <Router history={history}>
//       <Switch>
//         <Route path="/" exact component={Products} />
//         <Route path="/products" exact component={Products} />
//       </Switch>
//     </Router>
//   );
// }

const Routers = function ({ history, app }) {
  const routes = [
    {
      path: '/products',
      models: () => [import('./models/products')],
      component: () => import('./components/ProductList/ProductList'),
    }];
  return (
    <Router history={history}>
      <App>
        <Switch>
          <Route exact path="/" render={() => (<Redirect to="/products" />)} />
          <Route path="/products" exact component={Products} />
          <Route path="/billManage" exact component={BillManage} />
        </Switch>
      </App>
    </Router>
  )
};
//export default RouterConfig;
export default Routers;
