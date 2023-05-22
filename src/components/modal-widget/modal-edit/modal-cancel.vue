<template>
  <div class="modal">
    <h3 class="modal__title">Cancel changes?</h3>
    <div class="modal-buttons">
      <button class="edit-button" @click="cancelEdit">Yes</button>
      <button class="cancel-button" @click="closeModal">No</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'modal-cancel',
  methods: {
    cancelEdit() {
      this.$store.dispatch("SET_CURRENT_PAGE", "Todo list")
      this.closeModal()
      this.$store.dispatch("SET_CURRENT_TASK", null)
    },
    closeModal() {
      this.$store.dispatch("SET_CLOSE_MODAL")
    }
  }
}
</script>