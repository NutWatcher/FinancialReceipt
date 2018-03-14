import dva from 'dva';
import * as companyService from "../services/company";

export default {
  namespace: 'company',
  state: {
    list:[]
  },
  reducers: {
    save(state, { payload: { companyList: list } }) {
      console.log("save company in");
      return { ...state, list };
    },
  },
  effects: {
    * fetch({payload: name}, {call, put}) {
      console.log("fetchCompany in");
      const {data, headers} = yield call(companyService.fetchByName, name);
      yield put({
        type: 'save',
        payload: {
          companyList: data.companyList
        }
      });
    }
  }
};
