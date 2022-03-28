import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/register',
    component: () => import('../views/header.vue')
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
