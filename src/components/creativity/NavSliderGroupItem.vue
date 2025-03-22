<!--
  - Copyright (c) 2025.  Bubble
  -->

<script setup lang="ts">
import type { NavSliderGroupItemProps } from '@/types/PropsType'
import { jumpRoute } from '@/utils/RouterUtil'
import { useRouter } from 'vue-router'
import { watch } from 'vue'

const props = defineProps<{
  info: NavSliderGroupItemProps
}>()

const index = defineModel('index', { required: true })
watch(index, (val) => {
  if (val === props.info.id) {
    selectItem()
  }
})

const router = useRouter()

function selectItem() {
  index.value = props.info.id
  jumpRoute(router, props.info.route)
}
</script>

<template>
  <div
    class="bcc-nav-slider-item__wrap group-item" @click="selectItem"
    :class="{'is-active': index === props.info.id}"
  >
    <div class="bcc-nav-slider-item__content">
      <span
        class="router-item"
        :class="{'active': index === props.info.id}"
      >
        <span class="menu-title">
          <span>{{ info.label }}</span>
        </span>
      </span>
    </div>
  </div>
</template>

<style scoped>
.bcc-nav-slider-item__wrap {
  cursor: pointer;
  transition: background-color .3s;
}
.bcc-nav-slider-item__wrap:hover {
  background-color: var(--graph_bg_regular);
}
.bcc-nav-slider-item__wrap .bcc-nav-slider-item__content {
  margin-left: 60px;
  display: -webkit-inline-box;
  display: -ms-inline-flexbox;
  display: inline-flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  height: 38px;
}
.slider-bar .bcc-nav-slider-item__wrap .bcc-nav-slider-item__content {
  margin-left: 0;
}
.slider-bar .bcc-nav-slider-sub-menu__group .bcc-nav-slider-item__content {
  width: 100%;
}

.slider-bar .bcc-nav-slider-sub-menu__group .router-item {
  position: relative;
}
.slider-bar .bcc-nav-slider-sub-menu__group .router-item,
.slider-bar .bcc-nav-slider-sub-menu__group a {
  font-size: 14px;
  text-align: left;
  line-height: 18px;
  color: #757575;
  padding-left: 72px !important;
  width: 100%;
  height: 38px;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
  align-items: center;
}
.bcc-nav-slider-item__wrap.is-active {
  color: #00a1d6;
}
</style>
