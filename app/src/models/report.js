import * as reportService from "../services/report";

export default {
  namespace: 'report',
  state: {
    fileName: "",
    fileUrl:"",
    fileState: ""
  },
  reducers: {
    save(state, {payload}) {
      return {...state, ...payload};
    }
  },
  effects: {
    *generateReport({payload:{ reportName, params }}, { call, put }){
      let res = { };
      yield put({
        type: 'save',
        payload: {
          fileName: "",
          fileUrl: "",
          fileState: "start"
        }
      });
      if (reportName == "转出科目汇总"){
        res = yield call(reportService.fetchGroupByTurnOutSubject, params);
      }
      console.log(res);
      yield put({
        type: 'save',
        payload: {
          fileName: res.data.result.fileName,
          fileUrl: res.data.result.fileUrl,
          fileState: "finish"
        }
      });
    }
  }
}
