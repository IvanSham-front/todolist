<template>
  <main class="main">
    <section class="container">
      <h1 class="title">{{ $store.getters.currentPage }}</h1>
      <div class="todo-page" v-if="$store.getters.currentPage === 'Todo list'">
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
            :disabled="!newTaskValue"
          >Add Task</button>
        </div>
        <todo-list/>

        <div class="todo-page__notask" v-if="this.$store.getters.todoList.length === 0">No task</div>
      </div>
      <div v-if="$store.getters.currentPage === 'Edit page'" class="edit-page">
        <edit-page />
      </div>
    </section>

    <modal-widget/>
  </main>
</template>

<script>
import todoList from "../todoList/todoList.vue";
import editPage from "../editTodo/editPage.vue";
import modalWidget from "../modal-widget/modal-widget.vue";
import "./todoPage.scss";

export default {
  name: "todoPage",
  components: {
    todoList,
    editPage,
    modalWidget
  },
  data() {
    return {
      newTaskValue: "",
      activeModal: "",
      modalShow: false
    };
  },
  mounted() {
    this.$store.dispatch("LOAD_TODOLIST")
  },
  methods: {
    addTask() {
      const task = {
        id: this.$store.getters.todoList.length !== 0 ? this.$store.getters.todoList.at(-1).id + 1 : 0,
        name: this.newTaskValue,
        subtasks: [],
        open: false,
        checked: false
      };
      this.$store.dispatch("ADD_TASK", task);
      this.newTaskValue = "";
    },
    changeNewTaskValue(e) {
      this.newTaskValue = e.target.value;
    },
    deleteTask() {
      this.$store.dispatch("REMOVE_TASK");
      this.$store.dispatch("SET_CURRENT_TASK", null);
      if (this.$store.getters.currentPage === "Edit page") {
        this.$store.dispatch("SET_CURRENT_PAGE", "Todo list");
      }
    },
    closeModal() {
      this.$store.dispatch("SET_CLOSE_MODAL")
    },
  },
  beforeUpdate() {
    this.$store.dispatch("SAVE_TODOLIST")
  }
};
</script>