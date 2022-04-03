import { createStore } from 'vuex';
import registerModule from './module/register';

export default createStore({
  state: {
    loading: false
  },
  actions: {},
  mutations: {
    isLoading(state, payload) {
      state.loading = payload;
    }
  },
  modules: {
    register: registerModule
  }
});
