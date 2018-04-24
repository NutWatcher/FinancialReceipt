import dva from 'dva';
import {browserHistory} from 'dva/router';
import {message, Button} from 'antd';
import './index.less';

const app = dva({
  history: browserHistory,
  initialState: {
    company: {
      list: []
    },
    report:{
      fileName: "",
      fileUrl:"",
      fileState: "start"
    },
    bills: {
      closeDate: '2000-01',
      formList: {
        departmentList: [],
        taxTurnOutSubjectsList: [],
        professionsList: []
      },
      list: [],
      total: null,
      page: null,
    },
    globe: {
      success: "",
      error: ""
    }
  },
  onError(e) {
    console.log(e);
    console.log(e.msg);
    message.error(e.msg, 3);
  }
});

// 2. Plugins
// app.use({});

// 3. Model
// app.model(require('./models/example'));
let bills = require('./models/bills');
let globe = require('./models/globe');
let company = require('./models/company');
let report = require('./models/report');
app.model(globe);
app.model(bills);
app.model(company);
app.model(report);
// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
