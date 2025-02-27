/*
 * Copyright (c) 2025.  Bubble
 */

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
      meta: {
        metaParam: 'ofd3',
      },
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(
          /* webpackChunkName: "UserSpaceView" */
          '@/views/space/UserSpaceView.vue'
        ),
      children: [
        {
          path: '/space/:id?',
          name: 'space-main',
          meta: {
            mode: 'main',
          },
          component: () =>
            import(
              /* webpackChunkName: "SpaceMainFrag" */
              '@/components/space/SpaceMainFrag.vue'
            ),
        },
        {
          path: '/space/:id?/dynamic',
          name: 'space-dynamic',
          meta: {
            mode: 'dynamic',
          },
          component: () =>
            import(
              /* webpackChunkName: "SpaceDynamicFrag" */
              '@/components/space/SpaceDynamicFrag.vue'
            ),
        },
        {
          path: '/space/:id?/upload',
          name: 'space-upload',
          meta: {
            mode: 'upload',
          },
          component: () =>
            import(
              /* webpackChunkName: "SpaceUploadFrag" */
              '@/components/space/SpaceUploadFrag.vue'
            ),
        },
        {
          path: '/space/:id?/list',
          name: 'space-list',
          meta: {
            mode: 'list',
          },
          component: () =>
            import(
              /* webpackChunkName: "SpaceListFrag" */
              '@/components/space/SpaceListFrag.vue'
            ),
        },
        {
          path: '/space/:id?/collection',
          name: 'space-collection',
          meta: {
            mode: 'collection',
          },
          component: () =>
            import(
              /* webpackChunkName: "SpaceCollectionFrag" */
              '@/components/space/SpaceCollectionFrag.vue'
            ),
        },
        {
          path: '/space/:id?/bangumi',
          name: 'space-bangumi',
          meta: {
            mode: 'bangumi',
          },
          component: () =>
            import(
              /* webpackChunkName: "SpaceBangumiFrag" */
              '@/components/space/SpaceBangumiFrag.vue'
            ),
        },
        {
          path: '/space/:id?/settings',
          name: 'space-settings',
          meta: {
            mode: 'settings',
          },
          component: () =>
            import(
              /* webpackChunkName: "SpaceSettingsFrag" */
              '@/components/space/SpaceSettingsFrag.vue'
            ),
        },
      ],
    },
    {
      path: '/video/:id?',
      name: 'video',
      component: () =>
        import(
          /* webpackChunkName: "VideoPageView" */
          '@/views/video/VideoPageView.vue'
        ),
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
router.afterEach((to, from) => {
  const toDepth = to.path.split('/').length
  const fromDepth = from.path.split('/').length
  to.meta.transition = toDepth < fromDepth ? 'slide-right' : 'slide-left'
})

export default router
