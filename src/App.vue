<script setup lang="ts">
import { watch } from 'vue'
import { RouterView, useRouter } from 'vue-router'
import { useTokenStore } from '@/stores/token'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const token = useTokenStore()
const user = useUserStore()
watch(() => token.accessToken, async accessToken => {
  user.clearUserInfo()
  if (accessToken) {
    try { await user.fetchCurrentUserInfo() } catch { /* The request layer displays the error. */ }
  } else if (router.currentRoute.value.meta.requiresAuth) {
    await router.replace({ name: 'main-page', query: { login: '1', redirect: router.currentRoute.value.fullPath } })
  }
}, { immediate: true })
</script>

<template>
  <RouterView v-slot="{ Component, route }">
    <component :is="Component" :key="String(route.params.id || route.params.vid || route.matched[0]?.path)" />
  </RouterView>
</template>
