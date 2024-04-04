import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'writingwithai',
    component: () => import('../views/WritingWithAI.vue'),
    alias: '/index'
  },
  {
    path: '/demo',
    name: 'demo',
    component: () => import('../views/DemoPage.vue')
  },
  {
    path: '/error/:name',
    name: 'error',
    component: () => import('../views/Error.vue'),
    hidden: true
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/error/page',
    hidden: true
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router