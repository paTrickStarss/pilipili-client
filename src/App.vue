<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <!--  <RouterView />-->
  <router-view v-slot="{ Component, route }">
    <!-- 使用任何自定义过渡和回退到 `fade` -->
    <transition :name="route.meta.transition || 'fade'">
      <!--      <keep-alive>-->
      <component :is="Component" />
      <!--      </keep-alive>-->
    </transition>
  </router-view>
</template>
