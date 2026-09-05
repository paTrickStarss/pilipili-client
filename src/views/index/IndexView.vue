<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'
import { ASSETS_BASE_URL } from '@/utils/imgUtil'
import HeaderBar from '@/components/navbar/HeaderBar.vue'
import HeaderChannel from '@/components/navbar/HeaderChannel.vue'
import { useWindowStore } from '@/stores/window'

withDefaults(defineProps<{ type?: string }>(), { type: '' })
const windowStore = useWindowStore()
const slideDown = ref(false)
function updateScroll() {
  slideDown.value = window.scrollY > 10
  windowStore.setSlideDown(slideDown.value)
}
onMounted(() => {
  updateScroll()
  window.addEventListener('scroll', updateScroll, { passive: true })
})
onBeforeUnmount(() => {
  window.removeEventListener('scroll', updateScroll)
  windowStore.setSlideDown(false)
})
</script>

<template>
  <div class="page-shell" :class="{ 'pili-wrap': type === 'main' }">
    <header class="pili-header" :class="{ 'large-header': type === 'main' }">
      <HeaderBar :slide-down="type !== 'main' || slideDown" />
      <template v-if="type === 'main'">
        <div class="pili-header__banner">
          <picture class="v-img banner-img">
            <source :srcset="`${ASSETS_BASE_URL}/image/banner.png@3840w_360h_1c.avif`" type="image/avif" />
            <img alt="" />
          </picture>
          <div class="taper-line" />
        </div>
        <HeaderChannel />
      </template>
    </header>
    <div :class="type === 'main' ? 'pili-wrap-layout page-container' : 'page-shell-content'">
      <slot />
    </div>
  </div>
</template>

<style>
.page-shell { min-width: 0; }
.pili-header { position: relative; color: var(--text1); min-height: var(--header-height); width: 100%; }
.pili-wrap .pili-header__channel {
  max-width: calc(var(--content-max-width) + 2 * var(--layout-padding));
  padding-inline: var(--layout-padding);
}
.pili-header__banner {
  position: relative;
  height: clamp(155px, 9.375vw, 240px);
  background: #e3e5e7;
  overflow: hidden;
}
.pili-header__banner .banner-img { position: absolute; width: 100%; height: 100%; object-fit: cover; }
.pili-header__banner .taper-line { position: absolute; inset: 0 0 auto; height: 100px; background: linear-gradient(#0006, transparent); pointer-events: none; }
</style>
