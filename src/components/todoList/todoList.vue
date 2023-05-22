<template>
  <ul class="todo-list">
    <li v-for="(task) in todoList" :key="task.id" class="task">
      <div class="task__inner">
        <input
          type="checkbox"
          :id="'id' + task.name + task.id"
          class="task__checkbox custom_checkbox"
          @change="toggleCheckTaskes($event, task.id)"
          v-model="task.checked"
        >
        <label :for="'id' + task.name + task.id"></label>

        <div
          class="task__details"
          :class="{
            'task__details_empty': task.subtasks.length === 0,
            'task__details_open' : task.open
            }"
          @click="toggleOpenTask(task.id)"
        >
          <p class="task__summary">{{ taskName(task.name, task.subtasks) }}</p>
        </div>
      </div>

      <ul class="task__subtasks-list" v-if="task.open">
        <li class="task__subtask-item" v-for="subTask in task.subtasks" :key="subTask.id">
          <input
            :id="'id' + subTask.name + subTask.id"
            type="checkbox"
            class="task__checkbox custom-checkbox"
            v-model="subTask.checked"
            @change="toggleCheckSubTask($event, task.id, subTask.id)"
          >
          <label :for="'id' + subTask.name + subTask.id">{{ subTask.name }}</label>
        </li>
      </ul>

      <div class="task__buttons">
        <button class="edit-button" @click="editTask(task)">edit</button>
        <button class="delete-button" @click="openModalDeleteTask(task.id)">remove</button>
      </div>
    </li>
  </ul>
</template>


<script>
import "./todoList.scss";
import { mapGetters } from 'vuex';
export default {
  name: "todoList",
  data() {
    return {};
  },
  methods: {
    taskName(name, subtasks) {
      let value = name;
      if (subtasks.length > 0) {
        let acceptCount = 0;
        for (const subtask of subtasks) {
          if (subtask.checked) {
            acceptCount++;
          }
        }
        value += ` ${acceptCount}/${subtasks.length}`;
      }
      return value;
    },
    editTask(task) {
      this.$store.dispatch("SET_CURRENT_TASK", task);
      this.$store.dispatch("SET_CURRENT_PAGE", "Edit page");
    },
    toggleCheckTaskes(event, taskId) {
      this.$store.dispatch("TOGGLE_CHECK_TASK", {
        value: event.target.checked,
        taskId
      });
      this.$store.dispatch("SAVE_TODOLIST")
    },
    toggleCheckSubTask(event, taskId, subtaskId) {
      this.$store.dispatch("TOGGLE_CHECK_SUBTASK", {
        value: event.target.checked,
        taskId,
        subtaskId
      });
      this.$store.dispatch("SAVE_TODOLIST")
    },
    toggleOpenTask(id) {
      this.$store.dispatch("TOGGLE_OPEN_TASK", id);
    },
    openModalDeleteTask(id) {
      const task = this.todoList.find(item => item.id === id)
      this.$store.dispatch("SET_CURRENT_TASK", task)
      this.$store.dispatch("SET_OPEN_MODAL", "modal-delete")
    }
  },
  computed: {
    ...mapGetters(['todoList']),
  }
};
</script>