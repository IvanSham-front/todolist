<template>
  <div>
    <todo-page />
  </div>
</template>

<script>
import TodoPage from './components/todoPage/TodoPage';
import '@/assets/styles/styles.scss'

export default {
  name: "App",
  components: {
    TodoPage
  },
};
</script>
