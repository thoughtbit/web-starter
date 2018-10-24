export default {
  state: 0,
  reducers: {
    increment (state, payload) {
      return state + payload
    }
  },
  effects: {
    // use async/await for async actions
    async incrementAsync (payload, rootState) {
      await new Promise(resolve => setTimeout(resolve, 1000))
      this.increment(payload)
    }
  },
  selectors: {
    total(state) {
      return state
    }
  }
}
