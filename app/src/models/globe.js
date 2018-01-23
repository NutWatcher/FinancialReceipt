export default {
  namespace: 'globe',
  state: {
    success: "",
    error: ""
  },
  reducers: {
    showSuccess(state, {success}) {
      return {...state, success};
    },
    showError(state, {error}) {
      return {...state, error};
    }
  }
}
