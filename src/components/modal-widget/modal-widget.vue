<template>
  <div class="modal-widget" v-show="$store.getters.modalShow">
    <div class="modal-container">
      <component :is="$store.getters.activeModal"/>
    </div>
  </div>
</template>

<script>
import "./modal.scss";
import modalCancel from "./modal-edit/modal-cancel.vue";
import modalDelete from "./modal-delete/modal-delete.vue";
export default {
  name: "modal-widget",
  components: {
    modalCancel,
    modalDelete
  },
  methods: {}
};
</script>