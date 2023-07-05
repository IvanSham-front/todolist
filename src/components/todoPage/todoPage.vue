<template>
  <main class="main">
    <section class="container">
      <h1 class="title">{{ currentPage }}</h1>
      <div class="todo-page" v-if="currentPage === 'Todo list'">
        <div class="todo-page__add add-block">
          <input
            class="add-block__input"
            placeholder="+ add new task"
            type="text"
            v-model="newTaskValue"
            @change="changeNewTaskValue"
          >
          <button
            class="add-block__btn edit-button"
            @click="addTask"
            :disabled="newTaskValue === ''"
          >Add Task</button>
        </div>
        <todo-list/>

        <div class="todo-page__notask" v-if="noTask">No task</div>
      </div>
    </section>
  </main>
</template>

<script>
import TodoList from "../todoList/TodoList.vue";
import "./todoPage.scss";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "todoPage",
  components: {
    TodoList,
  },
  data() {
    return {
      newTaskValue: "",
      activeModal: "",
      modalShow: false
    };
  },
  methods: {
    ...mapActions([
      "SET_CLOSE_MODAL",
      "SAVE_TODOLIST",
      "REMOVE_TASK",
      "SET_CURRENT_TASK",
      "SET_CURRENT_PAGE",
      "SET_CLOSE_MODAL",
      "ADD_TASK",
      "LOAD_TODOLIST"
    ]),
    addTask() {
      const task = {
        id:
          this.todoList.length !== 0
            ? this.todoList.at(-1).id + 1
            : 0,
        name: this.newTaskValue,
        subtasks: [],
        open: false,
        checked: false
      };
      this.ADD_TASK(task);
      this.newTaskValue = "";
    },
    changeNewTaskValue(e) {
      this.newTaskValue = e.target.value;
    },
    deleteTask() {
      this.REMOVE_TASK();
      this.SET_CURRENT_TASK(null);
      if (this.currentPage === "Edit page") {
        this.SET_CURRENT_PAGE("Todo list");
      }
    },
    closeModal() {
      this.SET_CLOSE_MODAL();
    }
  },
  computed: {
    ...mapGetters(["currentPage", "todoList"]),
    noTask() {
      return this.todoList.length === 0
    }
  },
  beforeUpdate() {
    this.SAVE_TODOLIST();
  }
};
</script>