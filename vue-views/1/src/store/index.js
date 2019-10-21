import Vue from 'vue'
import Vuex from 'vuex'
import state from './state.js'
import mutations from './mutations.js'
import actions from './actions.js'
import getters from './getters.js'

import store1 from '@/views/module1/store'

Vue.use(Vuex)

const publicStore = {
  state,
  mutations,
  actions,
  getters
}

export default new Vuex.Store({
  modules: {
    publicStore,
    store1
  }

})
