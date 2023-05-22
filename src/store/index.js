import Vue from 'vue'
import Vuex from 'vuex'
import todolist from './todolist/todolist'
import currentTask from './currentTask/currentTask'
import modals from './modals/modals'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    todolist,
    currentTask,
    modals
  }
})
