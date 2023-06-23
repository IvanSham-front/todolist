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
import { mapActions } from "vuex";

export default {
  name: 'modal-cancel',
  methods: {
    ...mapActions([
      "SET_CURRENT_PAGE",
      "SET_CLOSE_MODAL",
      "SET_CURRENT_TASK"
    ]),
    cancelEdit() {
      this.SET_CURRENT_PAGE("Todo list");
      this.closeModal();
      this.SET_CURRENT_TASK(null);
    },
    closeModal() {
      this.SET_CLOSE_MODAL();
    }
  }
}
</script>