import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loggedIn: false,
    userId: null,
    searchObject: null
  },
  plugins: [createPersistedState()],
  mutations: {
    login: state => state.loggedIn = true,
    logout: state => state.loggedIn = false,
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
