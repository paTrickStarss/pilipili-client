/*
 * Copyright (c) 2025.  Bubble
 */

import { createRouter, createWebHistory } from 'vue-router'
import MainPageView from '@/views/main/MainPageView.vue'
import VideoPageErrorView from '@/views/error/VideoPageErrorView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // main-page
    {
      path: '/',
      name: 'main-page',
      component: MainPageView,
    },
    // error-page
    {
      path: '/error/:status',
      name: 'error-page',
      component: VideoPageErrorView,
    },
    // space
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
            index: 0
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
            index: 1
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
            index: 2
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
            index: 3
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
            index: 4
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
            index: 5
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
            index: 6
          },
          component: () =>
            import(
              /* webpackChunkName: "SpaceSettingsFrag" */
              '@/components/space/SpaceSettingsFrag.vue'
            ),
        },
      ],
    },

    // video
    {
      path: '/video/:vid?',
      name: 'video',
      component: () =>
        import(
          /* webpackChunkName: "VideoPageView" */
          '@/views/video/VideoPageView.vue'
        ),
    },

    // creativity-center
    {
      name: 'creativity-center',
      path: '/creativity',
      meta: {
        mode: 'main',
        index: 0
      },
      component: () =>
        import(
          /* webpackChunkName: "CreativityCenterView" */
          '@/views/creativity/CreativityCenterView.vue'
          ),
      children: [
        {
          path: '/creativity/upload',
          name: 'creativity-upload',
          meta: {
            mode: 'upload',
            index: -1
          },
          component: () =>
            import(
              /* webpackChunkName: "VideoUploadFrag" */
              '@/components/creativity/upload/VideoUploadFrag.vue'
              )
        },
        {
          path: '/creativity/audit',
          name: 'creativity-audit',
          meta: {
            mode: 'audit',
            index: 6
          },
          component: () =>
            import(
              /* webpackChunkName: "VideoAuditFrag" */
              '@/components/creativity/audit/VideoAuditFrag.vue'
              )
        },
      ]
    }
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
