import { createRouter, createWebHistory } from 'vue-router';

export const router = createRouter({
  history: createWebHistory('/05-vue-router/01-AuthPages'),
  routes: [
    {
      name: 'Index',
      path: '/',
      component: () => import('../views/PageIndex'),
    },
    {
      name: 'Login',
      path: '/login',
      component: () => import('../views/PageLogin'),
    },
    {
      name: 'Registration',
      path: '/register',
      component: () => import('../views/PageRegister'),
    },
  ],
});
