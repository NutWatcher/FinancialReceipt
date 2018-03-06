import * as billService from '../services/bills';

export default {
  namespace: 'bills',
  state: {
    list: [],
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
    initFormList(state, { payload: { formList: formList } }) {
      console.log("initFormList in");
      return { ...state, formList };
    }
  },
  effects: {
    *fetchForm({  }, { call, put }) {
      console.log("fetchForm in");
      const { data: professionsList, headers } = yield call(billService.fetchProfessions, {page: 1});
      const { data: departmentsList } = yield call(billService.fetchDepartments, {page: 1});
      const { data: taxTurnOutSubjectsList } = yield call(billService.fetchTaxTurnOutSubjects, {page: 1});
      yield put({
        type: 'initFormList',
        payload: {
          formList: {
            professionsList: professionsList.professionsList,
            departmentsList: departmentsList.departmentsList,
            taxTurnOutSubjectsList: taxTurnOutSubjectsList.taxTurnOutSubjectsList
          }
        }
      });
    },
    *fetch({ payload: { page = 1 } }, { call, put }) {
      console.log("fetch in");
      const { data, headers } = yield call(billService.fetch, { page });
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
