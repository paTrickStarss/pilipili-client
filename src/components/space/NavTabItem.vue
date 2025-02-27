<!--
  - Copyright (c) 2025.  Bubble
  -->

<script setup lang="ts">
import type { NavTabItemType } from '@/types/PropsType'
import { computed } from 'vue'
import { jumpRoute } from '@/utils/RouterUtil'
import { useRouter } from 'vue-router'

// defineProps({
//   index: {
//     type: Number,
//     default: 0
//   },
//   current: {
//     type: Number,
//     default: 0
//   },
//   icon: {
//     type: Object as () => NavTabIconStyleType,
//     default: () => {}
//   }
// })
const props = defineProps<{
  info: NavTabItemType
  countNum: number
}>()

const id = computed(() => props.info.id)
const current = defineModel('current', { type: Number, required: true })
const router = useRouter()
</script>

<template>
  <a
    :href="info.linkUrl"
    class="nav-tab__item"
    :class="{ active: current === id }"
    @click.prevent="jumpRoute(router, info.linkUrl)"
  >
    <i
      class="vui_icon nav-tab__item-icon"
      :class="info.styleClass"
      :style="{ color: `var(${info.color})` }"
    />
    <span class="nav-tab__item-text">{{ info.label }}</span>
    <span class="nav-tab__item-num" v-if="info.countShow">{{ countNum }}</span>
  </a>
</template>

<style scoped>
.nav-tab__item:first-child {
  margin-left: 0;
}

.nav-tab__item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 64px;
  margin-left: var(--item-margin-left);
}

.nav-tab__item * {
  transition: color 0.3s;
}

.nav-tab__item-icon {
  font-variation-settings: 'strk' 3;
  font-size: 20px;
  color: var(--graph_icon);
}

.nav-tab__item-text {
  margin-left: 4px;
  font-size: var(--item-font-size);
  color: var(--text1);
}

.nav-tab__item-text:hover {
  color: var(--brand_blue);
}

.nav-tab__item.active .nav-tab__item-text,
.nav-tab__item.active .nav-tab__item-num {
  font-weight: 700;
  color: var(--brand_blue);
}

.nav-tab__item-num {
  display: none;
  margin-left: 4px;
  font-size: 12px;
  color: var(--text2);
}

.nav-tab__item * {
  transition: color 0.3s;
}

@media (min-width: 1100px) {
  .nav-tab .nav-tab__item-num {
    display: block;
  }
}
</style>
