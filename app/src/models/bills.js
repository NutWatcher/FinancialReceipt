import * as billService from '../services/bills';

export default {
  namespace: 'bills',
  state: {
    list: [],
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
    }
  },
  effects: {
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
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathname === '/billManage') {
          dispatch({type: 'fetch', payload:{page:1}});
        }
      });
    },
  }
};
