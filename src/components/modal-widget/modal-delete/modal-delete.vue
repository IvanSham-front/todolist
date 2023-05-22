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
export default {
  name: 'modal-cancel',
  methods: {
    deleteTask() {
      this.$store.dispatch("REMOVE_TASK", this.$store.getters.currentTask)
      this.closeModal()
      this.$store.dispatch("SET_CURRENT_PAGE", "Todo list")
    },
    closeModal() {
      this.$store.dispatch("SET_CLOSE_MODAL")
    }
  }
}
</script>