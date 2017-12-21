import dva from 'dva';
//import 'antd/dist/antd.css';
import './index.less';

// 1. Initialize
// const app = dva();
const app = dva({
   initialState: {
     products: [
            { name: 'dva', id: 11 , key:1},
            { name: 'antd', id: 2 , key: 2},
          ],
     },
 });

// 2. Plugins
// app.use({});

// 3. Model
// app.model(require('./models/example'));
let c = require('./models/products');
app.model(c);
// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
