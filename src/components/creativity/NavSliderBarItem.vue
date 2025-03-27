<!--
  - Copyright (c) 2025.  Bubble
  -->

<script setup lang="ts">
import NavSliderGroupItem from '@/components/creativity/NavSliderGroupItem.vue'
import type { NavSliderBarItemProps } from '@/types/PropsType'
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps<{
  info: NavSliderBarItemProps
}>()

const index = defineModel('index', { required: true })
watch(index, (val) => {
  if (val === props.info.id) {
    selectItem()
  } else {
    closeItem()
  }
})

const router = useRouter()
const open = ref<boolean>(false)
const groupIndex = ref<number>(-1)

function selectItem() {
  open.value = true
  if (props.info.autoOpen) {
    groupIndex.value = 0
  }
}
function closeItem() {
  open.value = false
}
function switchGroup() {
  open.value = !open.value
  index.value = props.info.id

  if (props.info.route) {
    router.push(props.info.route)
  }
}
</script>

<template>
  <div class="bcc-nav-slider-sub-menu__wrap bar-item">
    <div class="bcc-nav-slider-sub-menu" @click="switchGroup">
      <span
        class="router_wrap"
        :class="{'active': index === props.info.id}"
      >
        <slot name="icon">
          <i
            v-if="info.iconClass"
            class="menu-icon bcc-iconfont"
            :class="info.iconClass"
          />
          <i v-else class="menu-icon bcc-iconfont bcc-icon-ic_Content_"/>
        </slot>
        <span class="menu-title">
          {{ info.label }}
        </span>
        <i
          class="bcc-iconfont arrow-iconfont bcc-icon-ic_drop-down"
          :class="{'active': open}"
          v-show="info.groupItem.length > 0"
        />
      </span>
    </div>
    <transition name="accordion" type="transition">
      <div class="bcc-nav-slider-sub-menu__group" v-show="open">
        <NavSliderGroupItem
          v-for="item in info.groupItem"
          :key="item.id"
          :info="item"
          v-model:index="groupIndex"
        />
      </div>
    </transition>
  </div>
</template>

<style>
.accordion-enter-active,
.accordion-leave-active {
  transition: all 0.4s ease;
}
.accordion-enter-from,
.accordion-leave-to {
  max-height: 0;
  opacity: 0;
}
.accordion-enter-to,
.accordion-leave-from {
  max-height: 300px;
  opacity: 1;
}
.slider-bar .bar-item {
  position: relative;
  display: block;
  font-size: 16px;
  line-height: 24px;
  color: #505050;
  cursor: pointer;
}
.bcc-nav-slider-sub-menu__wrap .bcc-nav-slider-sub-menu {
  color: #212121;
  height: 46px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  cursor: pointer;
  transition: background-color .3s;
}
.bcc-nav-slider-sub-menu__wrap .bcc-nav-slider-sub-menu:hover {
  background-color: var(--graph_bg_thick);
}
.slider-bar .bar-item .bcc-nav-slider-sub-menu>span,
.slider-bar .bar-item .bcc-nav-slider-sub-menu a {
  color: #000;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
  align-items: center;
}
.slider-bar .bar-item .bcc-nav-slider-item__wrap .router-item,
.slider-bar .bar-item .bcc-nav-slider-item__wrap .router_wrap,
.slider-bar .bar-item .bcc-nav-slider-sub-menu .router-item,
.slider-bar .bar-item .bcc-nav-slider-sub-menu .router_wrap {
  padding-left: 32px;
  padding-right: 24px;
  width: 100%;
  height: 100%;
}
.slider-bar .menu-icon {
  margin-right: 20px;
  font-size: 20px!important;
}
.slider-bar .bar-item i:first-child {
  font-size: 16px;
  color: #757575;
}
.slider-bar .menu-title {
  width: 90px;
  display: inline-block;
  position: relative;
  font-size: 14px;
  user-select: none;
}
.slider-bar .bar-item .arrow-iconfont {
  padding-left: 0;
  color: silver!important;
  font-size: 12px!important;
}
.slider-bar .bar-item i:last-child {
  font-size: 14px;
  color: #99a2aa;
}

.bcc-nav-slider-sub-menu__wrap .bcc-nav-slider-sub-menu__group {
  color: #757575;
}

.slider-bar .bar-item .bcc-nav-slider-item__wrap .router-item.active,
.slider-bar .bar-item .bcc-nav-slider-item__wrap .router-item.active i,
.slider-bar .bar-item .bcc-nav-slider-item__wrap .router_wrap.active,
.slider-bar .bar-item .bcc-nav-slider-item__wrap .router_wrap.active i,
.slider-bar .bar-item .bcc-nav-slider-sub-menu .router-item.active,
.slider-bar .bar-item .bcc-nav-slider-sub-menu .router-item.active i,
.slider-bar .bar-item .bcc-nav-slider-sub-menu .router_wrap.active,
.slider-bar .bar-item .bcc-nav-slider-sub-menu .router_wrap.active i {
  color: #00a1d6;
}
.slider-bar .bar-item .bcc-nav-slider-sub-menu .router_wrap.active i {
  transition: transform .3s;
}
.slider-bar .bar-item .bcc-nav-slider-sub-menu .router_wrap.active i.active {
  transform: rotate(180deg);
}
</style>
