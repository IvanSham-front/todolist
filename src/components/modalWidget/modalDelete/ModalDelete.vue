<template>
  <div class="modal">
    <h3 class="modal__title">Delete task?</h3>
    <div class="modal-buttons">
      <button class="edit-button" @click="deleteTask">Yes</button>
      <button class="cancel-button" @click="closeModal">No</button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
  name: 'modal-cancel',
  methods: {
    ...mapActions(["REMOVE_TASK", "SET_CURRENT_PAGE", "SET_CLOSE_MODAL"]),
    deleteTask() {
      this.REMOVE_TASK(this.currentTask)
      this.closeModal()
      this.SET_CURRENT_PAGE("Todo list")
    },
    closeModal() {
      this.SET_CLOSE_MODAL()
    }
  },
  computed: {
    ...mapGetters(["currentTask"])
  }
}
</script>