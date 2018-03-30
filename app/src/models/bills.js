import * as billService from '../services/bills';

export default {
  namespace: 'bills',
  state: {
    list: [],
    closeDate:'2000/01',
    formList:{
      departmentsList:[],
      taxTurnOutSubjectsList:[],
      professionsList:[]
    },
    total: null,
    page: null,
  },
  reducers: {
    add(state, param) {
      return state.filter(item => item.id !== id);
    },
    save(state, { payload: { billList: list, total, page } }) {
      console.log("save in");
      return { ...state, list, total, page };
    },
    initFormList(state, { payload: { formList: formList, closeDate } }) {
      console.log("initFormList in");
      return { ...state, formList, closeDate };
    },
    saveCloseDate(state, { payload: { closeDate } }) {
      console.log("saveCloseDate in");
      return { ...state, closeDate };
    }
  },
  effects: {
    *fetchForm({  }, { call, put }) {
      console.log("fetchForm in");
      const { data: professionsList, headers } = yield call(billService.fetchProfessions, {page: 1});
      const { data: departmentsList } = yield call(billService.fetchDepartments, {page: 1});
      const { data: taxTurnOutSubjectsList } = yield call(billService.fetchTaxTurnOutSubjects, {page: 1});
      const { data: closeDate } = yield call(billService.fetchCloseDate);
      yield put({
        type: 'initFormList',
        payload: {
          closeDate: closeDate.closeDate,
          formList: {
            professionsList: professionsList.professionsList,
            departmentsList: departmentsList.departmentsList,
            taxTurnOutSubjectsList: taxTurnOutSubjectsList.taxTurnOutSubjectsList
          }
        }
      });
    },
    *fetch({ payload: { page = 1, options = {}  } }, { call, put }) {
      console.log("fetch in");
      console.log(options);
      const { data, headers } = yield call(billService.fetch, {page, ...options});
      yield put({
        type: 'save',
        payload: {
          billList: data.billList,
          total:null,
          page:1
        },
      });
    },
    *create({ payload: values }, { call, put }) {
      console.log("create in");
      let value = yield call(billService.create, values);
      console.log(value);
      //yield put({ type: 'globe/showSuccess', success: "添加成功" });
      yield put({ type: 'fetch', payload:{page:1}});
    },
    *update({ payload: values }, { call, put }) {
      console.log("update in");
      console.log(values);
      let value = yield call(billService.update, values);
      console.log(value);
      //yield put({ type: 'globe/showSuccess', success: "添加成功" });
      //yield put({ type: 'fetch', payload:{page:1}});
    },
    *delete({ payload: values }, { call, put }) {
      console.log("delete in");
      console.log(values);
      let value = yield call(billService.del, values);
      console.log(value);
      yield put({ type: 'globe/showSuccess', success: "删除成功" });
      yield put({ type: 'fetch', payload:{page:1}});
    },
    *setCloseDate({ payload: closeDate }, { call, put }) {
      console.log("setCloseDate in");
      console.log(closeDate);
      let value = yield call(billService.setCloseDate, {closeDate:closeDate});
      console.log(value);
      yield put({ type: 'globe/showSuccess', success: "设置成功" });
      yield put({ type: 'fetchCloseDate'});
    },
    *fetchCloseDate({ }, { call, put }) {
      console.log("fetchCloseDate in");
      const { data: closeDate } = yield call(billService.fetchCloseDate);
      console.log(closeDate);
      yield put({ type: 'saveCloseDate',  payload: {closeDate: closeDate.closeDate} });
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathname === '/billManage') {
          dispatch({type: 'fetch', payload:{page:1}});
          dispatch({type: 'fetchForm'});
        }
      });
    },
  }
};
