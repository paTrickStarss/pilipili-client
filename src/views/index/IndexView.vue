<!--
  - Copyright (c) 2024. Bubble
  -->

<script setup lang="ts">
import { onMounted, onUnmounted, reactive, ref } from 'vue'
import NavBar from '@/components/navbar/NavBar.vue'

// 切换navbar背景
const isNavBarTransparent = ref<boolean>(true)
const headerStyle = reactive({
  backgroundColor: 'transparent',
  boxShadow: '0 5px 8px rgba(255, 255, 255, 0.5)',
})

function switchNavBarBackground(isTransparent: boolean) {
  isNavBarTransparent.value = isTransparent
  headerStyle.backgroundColor = isNavBarTransparent.value
    ? 'transparent'
    : '#ffffff'
  headerStyle.boxShadow = isNavBarTransparent.value
    ? 'none'
    : '0 5px 8px rgba(255, 255, 255, 0.5)'
  // console.log('switchNavBarBackground', isTransparent, headerStyle)
}

const controller = new AbortController()
onMounted(() => {
  const scrollEventHandler = () => {
    const scrollTop = document.documentElement.scrollTop

    // 触发navbar背景切换事件
    if (isNavBarTransparent.value && scrollTop >= 150) {
      switchNavBarBackground(false)
    } else if (!isNavBarTransparent.value && scrollTop <= 130) {
      switchNavBarBackground(true)
    }
  }
  window.addEventListener('scroll', scrollEventHandler, {
    signal: controller.signal,
  })
})
onUnmounted(() => {
  // window.removeEventListener('scroll', scrollEventHandler)
  controller.abort()
})

</script>

<template>
  <div>
    <a-flex class="parent" vertical>
      <!--      顶栏-->
      <div ref="headerRef" class="header">
        <NavBar :style="headerStyle" />
      </div>

      <!--      内容主体-->
      <slot>Waiting for slot content...</slot>

      <!--      页脚-->
      <div class="footer">footer</div>
    </a-flex>
  </div>
</template>

<style scoped>
.parent {
  width: 100%;
  height: 100%;
  font-family: inherit;
}

.header {
  display: flex;
  position: fixed;
  width: 100%;
  z-index: 1000;
  transition: all 0.3s;
}

.footer {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: grey;
  height: 100px;
}

</style>
