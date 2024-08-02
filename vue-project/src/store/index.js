import { createStore } from 'vuex'

const store = createStore({
  state() {
    return {
      isLoggedIn: false
    }
  },
  mutations: {
    login(state) {
      state.isLoggedIn = true
    },
    logout(state) {
      state.isLoggedIn = false
    }
  },
  actions: {
    login({ commit }) {
      commit('login')
    },
    logout({ commit }) {
      commit('logout')
    }
  }
})

export default store
