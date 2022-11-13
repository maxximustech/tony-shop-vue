import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    baseUrl: "http://172.20.10.4:5000/",
    count: 1,
    jwt_token: "",
    user: {}
  },
  getters: {
    increment: state => {
      return state.count + 1;
    }
  },
  mutations: {
    updateCount: (state, payload)=>{
        state.count = payload;
    },
    setAuth: (state, payload)=>{
      state.jwt_token = payload.token;
      state.user = payload.user;
    }
  },
  actions: {
    asyncUpdateCount: ({ commit, state }, payload)=>{
      setTimeout(()=>{
        commit('updateCount',payload);
      },3000);
    }
  },
  modules: {
  }
})
