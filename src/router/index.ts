import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    redirect: () => {
      return { path: '/resources' };
    },
  },
  {
    path: '/resources',
    name: 'Resources',
    component: () => import('../views/Resources/ResourceListView.vue'),
  },
  {
    path: '/resources/:resourceId',
    name: 'Resource',
    props: true,
    component: () => import('../views/Resources/ResourceView.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
