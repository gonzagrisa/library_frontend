import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loggedIn: false,
    userId: null,
    searchObject: null,
    rol: null,  
    viewKey:0
  },
  plugins: [createPersistedState()],
  mutations: {
    login (state, payload){
      state.loggedIn = true;
      state.userId = payload.userId;
      state.rol = payload.userRol;
    },
    /* : state => state.loggedIn = true, */
    /* logout: state => state.loggedIn = false, */
    logout (state){
      state.loggedIn = false;
      state.userId = null;
      state.searchObject = null;
      state.rol = null;
      state.viewKey = 0;
    },
    searchedObject (state, book) {
      state.searchObject = book;
    }
  },

  actions: {
  },
  modules: {
  },
  getters:{
    getBook: state => { return state.searchObject }
  }
})
