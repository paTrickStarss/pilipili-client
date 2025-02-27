/*
 * Copyright (c) 2024-2025.  Bubble
 */

import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { VideoPageInfoType } from '@/types/PropsType'

export const useVideoStore = defineStore('video', () => {
  const vid = ref<number>(0)
  const uid = ref<number>(0)
  const title = ref<string>('')
  const coverUrl = ref<string>('')
  const contentUrl = ref<string>('')
  const desc = ref<string>('')

  const videoPageInfo = computed(() => {
    return {
      vid,
      uid,
      title,
      coverUrl,
      contentUrl,
      desc,
    }
  })

  function saveVideoPageInfo(info: VideoPageInfoType) {
    vid.value = info.vid
    uid.value = info.uid
    title.value = info.title || ''
    coverUrl.value = info.coverUrl || ''
    contentUrl.value = info.contentUrl || ''
    desc.value = info.desc || ''
  }

  function clear() {
    vid.value = 0
    uid.value = 0
    title.value = ''
    coverUrl.value = ''
    contentUrl.value = ''
    desc.value = ''
  }

  return {
    vid,
    uid,
    title,
    coverUrl,
    contentUrl,
    desc,
    videoPageInfo,
    saveVideoPageInfo,
    clear,
  }
})
