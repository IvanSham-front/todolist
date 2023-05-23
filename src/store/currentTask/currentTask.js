import Vue from "vue"

export default {
  state: {
    currentTask: null,
    subtasks: [],
    history: [],
    currentIndex: -1,
  },
  getters: {
    currentTask: state => state.currentTask,
    subtasks: state => state.subtasks,
    historyIndex: state => state.currentIndex,
    history: state => state.history
  },
  mutations: {
    set_current_task: (state, task) => {
      if (!task) {
        state.currentTask = null
        return
      }
      const { id, name, open, checked } = task
      state.currentTask = { id, name, open, checked }
      state.subtasks = task.subtasks
    },
    set_current_task_name: (state, value) => {
      state.currentTask.name = value
    },
    add_current_task_subtask: (state, subtask) => {
      state.subtasks = [...state.subtasks, subtask]
    },
    set_current_task_subtask_name: (state, payload) => {
      const index = state.subtasks.findIndex(item => item.id === payload.id)
      state.subtasks[index].name = payload.value
    },
    remove_current_task_subtask: (state, payload) => {
      state.subtasks = state.subtasks.filter(item => item.id !== payload);
    },
    toggle_check_current_task: (state, value) => {
      state.currentTask.checked = value
      for (let i = 0; i < state.subtasks.length; i++) {
        state.subtasks[i].checked = value
      }
    },
    toggle_check_current_task_subtask: (state, payload) => {
      const indexSubtask = state.subtasks.findIndex(
        item => item.id === payload.id
      );
      state.subtasks[indexSubtask].checked = payload.value;
      let fullChecked = true;
      for (let subtask of state.subtasks) {
        if (!subtask.checked) {
          fullChecked = false;
        }
      }
      state.currentTask.checked = fullChecked;
    },
    set_default_history: (state) => {
      state.history = [{ currentTask: state.currentTask, subtasks: state.subtasks }]
    },
    save_history_step: (state) => {
      state.history.push({
        currentTask: JSON.parse(JSON.stringify(state.currentTask)),
        subtasks: JSON.parse(JSON.stringify(state.subtasks))
      })
      state.currentIndex++
    },
    undo_history: (state) => {
      state.currentIndex--
      const newCurrentTask = state.currentTask
      Object.keys(newCurrentTask).forEach(key => {
        Vue.set(state.currentTask, key, state.history[state.currentIndex].currentTask[key]);
      });
      state.subtasks = state.history[state.currentIndex].subtasks
    },
    rendo_history: (state) => {
      state.currentIndex++
      const newCurrentTask = state.currentTask
      Object.keys(newCurrentTask).forEach(key => {
        Vue.set(state.currentTask, key, state.history[state.currentIndex].currentTask[key]);
      });
      state.subtasks = state.history[state.currentIndex].subtasks
    }
  },
  actions: {
    SET_CURRENT_TASK: (state, task) => {
      state.commit("set_current_task", task)
      state.commit("save_history_step")
    },
    SET_CURRENT_TASK_NAME: (state, value) => {
      state.commit("set_current_task_name", value)
      state.commit("save_history_step")
    },
    ADD_CURRENT_TASK_SUBTASK: (state, subtask) => {
      state.commit("add_current_task_subtask", subtask)
      state.commit("save_history_step")
    },
    REMOVE_CURRENT_TASK_SUBTASK: (state, id) => {
      state.commit("remove_current_task_subtask", id)
      state.commit("save_history_step")
    },
    SET_CURRENT_TASK_SUBTASK_NAME: (state, payload) => {
      state.commit("set_current_task_subtask_name", payload)
      state.commit("save_history_step")
    },
    TOGGLE_CHECK_CURRENT_TASK: (state, payload) => {
      state.commit("toggle_check_current_task", payload)
      state.commit("save_history_step")
    },
    TOGGLE_CHECK_CURRENT_TASK_SUBTASK: (state, payload) => {
      state.commit("toggle_check_current_task_subtask", payload)
      state.commit("save_history_step")
    },
    SET_DEFAULT_HISTORY: (state) => {
      state.commit("save_defaul_history")
    },
    SAVE_HISTORY_STEP: (state) => {
      state.commit("save_history_step")
    },
    UNDO_HISTORY: (state) => {
      state.commit("undo_history")
    },
    RENDO_HISTORY: (state) => {
      state.commit("rendo_history")
    }
  }
}