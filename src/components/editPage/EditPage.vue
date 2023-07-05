<template>
  <section class="task-edit task-edit__inner" v-if="currentTask">
    <div class="buttons-history">
      <button @click="undoChanges" :disabled="disabledUndo">&#8592;</button>
      <button @click="rendoChanges" :disabled="disabledRendo">&#8594;</button>
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
import { mapGetters, mapActions } from "vuex";

export default {
  name: "editPage",
  data() {
    return {
      timer: null
    };
  },
  mounted() {
    if (!this.currentTask) {
      setTimeout(() => {
        const routeId = this.$route.params.id
        const currentTask = this.todoList.find(item => item.id == routeId)
        if (currentTask) {
          this.SET_CURRENT_TASK(currentTask)
        } else {
          this.$router.push('/')
        }
      }, 500)
    }
  },
  methods: {
    ...mapActions([
      "SET_CURRENT_TASK_NAME",
      "SET_CURRENT_TASK",
      "ADD_CURRENT_TASK_SUBTASK",
      "SET_CURRENT_TASK_SUBTASK_NAME",
      "REMOVE_CURRENT_TASK_SUBTASK",
      "SET_OPEN_MODAL",
      "ACCEPT_EDIT_CURRENT_TASK",
      "TOGGLE_CHECK_CURRENT_TASK",
      "TOGGLE_CHECK_CURRENT_TASK_SUBTASK",
      "UNDO_HISTORY",
      "RENDO_HISTORY",
      "SET_CURRENT_PAGE"
    ]),
    changeCurrentTaskName(e) {
      this.SET_CURRENT_TASK_NAME(e.target.value);
    },
    addSubtask() {
      const newSubTask = {
        id: this.currentTask.id + "." + this.nextIndex,
        checked: false,
        name: ""
      };
      this.ADD_CURRENT_TASK_SUBTASK(newSubTask);
    },
    changeSubtaskName(e, id) {
      if (e && e.target) {
        this.SET_CURRENT_TASK_SUBTASK_NAME({
          value: e.target.value,
          id
        });
      }
    },
    deleteSubtask(id) {
      this.REMOVE_CURRENT_TASK_SUBTASK(id);
    },
    openModalCancelChanges() {
      this.SET_OPEN_MODAL("modal-cancel");
    },
    acceptEditCurrentTask() {
      const sendData = {
        id: this.currentTask.id,
        editedTask: {
          ...this.currentTask,
          subtasks: this.subtasks
        }
      };
      this.ACCEPT_EDIT_CURRENT_TASK(sendData);
      this.$router.push("/");
      this.SET_CURRENT_TASK(null);
    },
    toggleCheckTaskes(event) {
      this.TOGGLE_CHECK_CURRENT_TASK(event.target.checked);
    },
    toggleCheckSubTask(event, subtaskId) {
      const sendData = {
        value: event.target.checked,
        id: subtaskId
      };
      this.TOGGLE_CHECK_CURRENT_TASK_SUBTASK(sendData);
    },
    openModalDeleteTask() {
      this.SET_OPEN_MODAL("modal-delete");
    },
    undoChanges() {
      this.UNDO_HISTORY();
    },
    rendoChanges() {
      this.RENDO_HISTORY();
    }
  },
  computed: {
    ...mapGetters(["subtasks", "currentTask", "historyIndex", "history", "todoList"]),
    nextIndex() {
      return this.subtasks.length === 0 ? 0 : this.subtasks.length + 1;
    },
    checkEmptySubtasks() {
      return this.subtasks.every(item => item.name !== '');
    },
    disabledUndo() {
      return this.historyIndex <= 0;
    },
    disabledRendo() {
      return this.historyIndex >= this.history.length - 1;
    }
  }
};
</script>
