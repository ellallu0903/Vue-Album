import Vue from 'vue'
import Vuex from 'vuex'
import Persistedstate from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      name: '',
      id: ''
    },
    sign: {
      account: ''
    }
  },
  mutations: {
    logout (state) {
      state.user.name = ''
      state.user.id = ''
    },
    login (state, data) {
      state.user.name = data.account
      state.user.id = data._id
    },
    cleanAccount (state) {
      state.sign.account = ''
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [Persistedstate({ key: 'album' })]
})
