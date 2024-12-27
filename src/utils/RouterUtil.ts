/*
 * Copyright (c) 2024. Bubble
 */

import { type Router } from 'vue-router'

/**
 * 在新标签页打开链接
 * @param url 链接
 * @param newPage 是否在新标签页打开
 */
export function openLink(url: string, newPage: boolean = false): void {
  window.open(url, newPage? '_blank':'_self')
}

export function jumpRoute(router: Router, path: string): void {
  // console.log('jumpRoute: ', path)

  router.push(path)
    .then(r => {
      console.log('router.push', path, r)
    })
    .catch(e => {
      console.error('router.push', e)
    })
}
