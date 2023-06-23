<template>
  <div class="modal-widget" v-show="$store.getters.modalShow">
    <div class="modal-container">
      <component :is="$store.getters.activeModal"/>
    </div>
  </div>
</template>

<script>
import "./modal.scss";
import ModalCancel from "./modalCancel/ModalCancel.vue";
import ModalDelete from "./modalDelete/ModalDelete.vue";
export default {
  name: "modal-widget",
  components: {
    ModalCancel,
    ModalDelete
  },
  methods: {}
};
</script>