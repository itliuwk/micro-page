import Vue from 'vue'
import Vuex from 'vuex'
import micropage from './modules/micropage'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    micropage
  }
})

export default store
