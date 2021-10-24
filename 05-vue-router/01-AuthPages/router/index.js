import { createRouter, createWebHistory } from 'vue-router';
import PageIndex from '../views/PageIndex';
import PageLogin from '../views/PageLogin';
import PageRegister from '../views/PageRegister';

export const router = createRouter({
  history: createWebHistory('/05-vue-router/01-AuthPages'),
  routes: [
    {
      name: 'Index',
      path: '/',
      component: PageIndex,
    },
    {
      name: 'Login',
      path: '/login',
      component: PageLogin,
    },
    {
      name: 'Registration',
      path: '/register',
      component: PageRegister,
    },
  ],
});
