export default {
  state: {
    todoList: [
      {
        id: 0,
        name: "adada",
        subtasks: [
          {
            id: 0.0,
            name: "adadad",
            checked: false
          },
          {
            id: 0.2,
            name: "adadad",
            checked: false
          },
          {
            id: 0.3,
            name: "adadad",
            checked: false
          }
        ],
        open: false,
        checked: false
      }
    ],
    currentPage: "Todo list",
  },
  getters: {
    todoList: state => state.todoList,
    currentPage: state => state.currentPage
  },
  mutations: {
    accept_edit_current_task: (state, payload) => {
      const index = state.todoList.findIndex(item => item.id === payload.id);
      state.todoList.splice(index, 1, payload.editedTask)
    },
    add_task: (state, task) => {
      state.todoList = [...state.todoList, task]
    },
    remove_task: (state, payload) => {
      state.todoList = state.todoList.filter(item => item.id !== payload.id);
    },
    toggle_open_task: (state, id) => {
      const index = state.todoList.findIndex(item => item.id === id);
      state.todoList[index].open = !state.todoList[index].open;
    },
    toggle_check_task: (state, payload) => {
      const index = state.todoList.findIndex(item => item.id === payload.taskId);
      state.todoList[index].checked = payload.value;
      for (let i = 0; i < state.todoList[index].subtasks.length; i++) {
        state.todoList[index].subtasks[i].checked = payload.value
      }
    },
    toggle_check_subtask: (state, payload) => {
      const indexTask = state.todoList.findIndex(item => item.id === payload.taskId);
      const indexSubtask = state.todoList[indexTask].subtasks.findIndex(
        item => item.id === payload.subtaskId
      );
      state.todoList[indexTask].subtasks[indexSubtask].checked = payload.value;
      let fullChecked = true;
      for (let subtask of state.todoList[indexTask].subtasks) {
        if (!subtask.checked) {
          fullChecked = false;
        }
      }
      state.todoList[indexTask].checked = fullChecked;
    },
    set_current_page: (state, payload) => {
      state.currentPage = payload
    },
    set_todolist: (state, payload) => {
      state.todoList = payload
    }
  },
  actions: {
    ADD_TASK: (state, task) => {
      state.commit("add_task", task)
    },
    REMOVE_TASK: (state, payload) => {
      state.commit("remove_task", payload)
    },
    TOGGLE_OPEN_TASK: (state, id) => {
      state.commit("toggle_open_task", id)
    },
    TOGGLE_CHECK_TASK: (state, payload) => {
      //payload = {taskId, value}
      state.commit("toggle_check_task", payload)
    },
    TOGGLE_CHECK_SUBTASK: (state, payload) => {
      // payload = {taskId, subtaskId, value}
      state.commit("toggle_check_subtask", payload)
    },
    SET_CURRENT_PAGE: (state, page) => {
      state.commit("set_current_page", page)
    },
    ACCEPT_EDIT_CURRENT_TASK(state, payload) {
      state.commit("accept_edit_current_task", payload)
    },
    SAVE_TODOLIST: (state) => {
      window.localStorage.setItem("todolist", JSON.stringify(state.getters.todoList))
    },
    LOAD_TODOLIST: (state) => {
      const todolist  = window.localStorage.getItem("todolist")
      state.commit("set_todolist", JSON.parse(todolist))
    }
  },
}