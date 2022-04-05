import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    component: () => import('../views/header.vue'),
    meta: {
      title: `${import.meta.env.VITE_PAGE_TITLE}首頁`
    }
  },
  {
    path: '/register',
    component: () => import('../views/register.vue'),
    meta: {
      title: `${import.meta.env.VITE_PAGE_TITLE}會員註冊`
    }
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
