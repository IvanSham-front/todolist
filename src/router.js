import Vue from 'vue';
import VueRouter from 'vue-router';

import TodoPage from './components/todoPage/TodoPage.vue';
import EditTodo from './components/editPage/EditPage.vue';

Vue.use(VueRouter);

const routes = [
  { path: '/', component: TodoPage },
  { path: '/edit/:id', component: EditTodo },
];

const router = new VueRouter({
  routes,
});

export default router;