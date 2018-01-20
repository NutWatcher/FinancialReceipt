import dva from 'dva';
import './index.less';

const app = dva({
   initialState: {
     bills: {
       list: [],
       total: null,
       page: null,
     }
   },
    onError(e, dispatch) {
    console.log(e.message);
  },
 });

// 2. Plugins
// app.use({});

// 3. Model
// app.model(require('./models/example'));
let bills = require('./models/bills');
app.model(bills);
// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
