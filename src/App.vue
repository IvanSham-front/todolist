<template>
  <div>
    <todo-page />
  </div>
</template>

<script>
import todoPage from './components/todoPage/todoPage';
import '@/assets/styles/styles.scss'

export default {
  name: "App",
  components: {
    todoPage
  },
};
</script>
