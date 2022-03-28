import { createStore } from 'vuex';
import registerModule from './module/register';
export default createStore({
  state: {
    test: '1'
  },
  actions: {},
  mutations: {},
  modules: {
    register: registerModule
  }
});
