<template>
  <section class="task-edit task-edit__inner">
    <div class="buttons-history">
      <button @click="undoChanges" :disabled="$store.getters.historyIndex <= 0">&#8592;</button>
      <button
        @click="rendoChanges"
        :disabled="$store.getters.historyIndex >= $store.getters.history.length -1"
      >&#8594;</button>
    </div>
    <h2 class="task-edit__title">select title task</h2>
    <div class="task-edit__head">
      <input
        id="task"
        type="checkbox"
        v-model="currentTask.checked"
        @focusout="toggleCheckTaskes($event)"
      >
      <label for="task"></label>
      <input
        type="text"
        v-model="currentTask.name"
        class="task-edit__input"
        @change="changeCurrentTaskName($event)"
      >
      <button class="task__delete-btn delete-button" @click="openModalDeleteTask">delete</button>
    </div>

    <hr class="line">

    <ul class="task-edit__subtasks">
      <h3 class="tast-edit__title">subtasks</h3>

      <li class="task__subtask-item" v-for="(subtask) in subtasks" :key="subtask.id">
        <input
          type="checkbox"
          :id="subtask.id + subtask.name"
          v-model="subtask.checked"
          class="task__checkbox"
          @change="toggleCheckSubTask($event, subtask.id)"
        >
        <label :for="subtask.id + subtask.name"></label>
        <input
          type="text"
          v-model="subtask.name"
          class="task-edit__input"
          @focusout="changeSubtaskName($event, subtask.id)"
        >
        <button class="task__delete-btn delete-button" @click="deleteSubtask(subtask.id)">delete</button>
      </li>
    </ul>
    <button @click="addSubtask(nextIndex)" class="task-edit__add-btn edit-button">Add Subtask</button>

    <div class="task__buttons">
      <button
        class="task__edit-btn edit-button"
        @click="acceptEditCurrentTask"
        :disabled="!checkEmptySubtasks"
      >accept</button>
      <button class="task__cancel-btn cancel-button" @click="openModalCancelChanges">cancel</button>
    </div>
  </section>
</template>

<script>
import "./editPage.scss";
import { mapGetters } from "vuex";

export default {
  name: "editPage",
  data() {
    return {
      timer: null
    };
  },
  methods: {
    changeCurrentTaskName(e) {
      this.$store.dispatch("SET_CURRENT_TASK_NAME", e.target.value);
    },
    addSubtask() {
      const newSubTask = {
        id: this.currentTask.id + "." + this.nextIndex,
        checked: false,
        name: ""
      };
      this.$store.dispatch("ADD_CURRENT_TASK_SUBTASK", newSubTask);
    },
    changeSubtaskName(e, id) {
      if (e && e.target) {
        this.$store.dispatch("SET_CURRENT_TASK_SUBTASK_NAME", {
          value: e.target.value,
          id
        });
      }
    },
    deleteSubtask(id) {
      this.$store.dispatch("REMOVE_CURRENT_TASK_SUBTASK", id);
    },
    openModalCancelChanges() {
      this.$store.dispatch("SET_OPEN_MODAL", "modal-cancel");
    },
    acceptEditCurrentTask() {
      const sendData = {
        id: this.currentTask.id,
        editedTask: {
          ...this.currentTask,
          subtasks: this.subtasks
        }
      };
      this.$store.dispatch("ACCEPT_EDIT_CURRENT_TASK", sendData);
      this.$store.dispatch("SET_CURRENT_PAGE", "Todo list");
      this.$store.dispatch("SET_CURRENT_TASK", null);
    },

    toggleCheckTaskes(event) {
      this.$store.dispatch("TOGGLE_CHECK_CURRENT_TASK", event.target.checked);
    },
    toggleCheckSubTask(event, subtaskId) {
      const sendData = {
        value: event.target.checked,
        id: subtaskId
      };
      this.$store.dispatch("TOGGLE_CHECK_CURRENT_TASK_SUBTASK", sendData);
    },
    openModalDeleteTask() {
      this.$store.dispatch("SET_OPEN_MODAL", "modal-delete");
    },
    undoChanges() {
      this.$store.dispatch("UNDO_HISTORY");
    },
    rendoChanges() {
      this.$store.dispatch("RENDO_HISTORY")
    }
  },
  computed: {
    ...mapGetters(["subtasks", "currentTask"]),
    nextIndex() {
      return this.subtasks.length === 0 ? 0 : this.subtasks.length + 1;
    },
    checkEmptySubtasks() {
      let flag = true;
      this.subtasks.forEach(item => {
        if (!item.name) {
          flag = false;
        }
      });
      return flag;
    }
  }
};
</script>
