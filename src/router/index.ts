import { createRouter, createWebHistory } from 'vue-router'
import MainPageView from '@/views/main/MainPageView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'MainPageView',
      component: MainPageView,
    },
    {
      path: '/space/:id?',
      name: 'space',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/views/space/UserSpaceView.vue'),
    },
  ],
})

// router.beforeEach((to, from, next) => {
//
// })
//
// router.afterEach((to, from, next) => {
//
// })

export default router
