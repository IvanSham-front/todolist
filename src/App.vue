<template>
  <div>
    <router-view></router-view>
    <modal-widget/>
  </div>
</template>

<script>
import '@/assets/styles/styles.scss'
import ModalWidget from "./components/modalWidget/ModalWidget.vue";
import { mapActions } from 'vuex';

export default {
  name: "App",
  components: {
    ModalWidget
  },
  mounted() {
    this.LOAD_TODOLIST();
  },
  methods: {
    ...mapActions(['LOAD_TODOLIST'])
  }
};
</script>
