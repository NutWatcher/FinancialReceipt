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
    save(state, { payload: { data: list, total, page } }) {
      return { ...state, list, total, page };
    }
  },
  effects: {
    *fetch({ payload: { page = 1 } }, { call, put }) {
      const { data, headers } = yield call(billService.create, { page });
      yield put({
        type: 'save',
        payload: {
          data,
          total: parseInt(headers['x-total-count'], 10),
          page: parseInt(page, 10),
        },
      });
    },
    *create({ payload: values }, { call, put }) {
      console.log("create in");
      yield call(billService.create, values);
      yield put({ type: 'reload' });
    },
  }
};
