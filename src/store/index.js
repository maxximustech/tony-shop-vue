import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    baseUrl: "http://172.20.10.2:5000/",
    count: 1,
    jwt_token: "",
    user: {},
    permissions: [],
    menus: [
      {
        name: "Home",
        link: "/"
      },
      {
        name: "About",
        link: "/about"
      },
      {
        name: "Cart",
        link: "/cart",
        logInRequired: true
      },
      {
        name: "Login",
        link: "/login",
        logInRequired: false
      },
      {
        name: "Sign Up",
        link: "/signup",
        logInRequired: false
      },
      {
        name: "Admin",
        logInRequired: true,
        children: [
          {
            name: "Category",
            link: "/category",
            permissionRequired: ['access-all']
          },
          {
            name: "Product",
            link: "/product",
            permissionRequired: ['access-all','create:products','edit:products','delete:products']
          }
        ]
      }
    ]
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
      state.permissions = payload.permissions
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
