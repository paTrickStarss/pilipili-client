<!--
  - Copyright (c) 2025.  Bubble
  -->

<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps({
  slidesItem: {
    type: Object,
    default: () => {},
  },
  index: {
    type: Number,
    default: 0,
  },
})
const current = defineModel('current', {
  type: Number,
  default: 0,
  required: true,
})
const userClick = ref<boolean>(false)

function handleClick() {
  current.value = props.index
  userClick.value = true
}

watch(current, val => {
  if (userClick.value && val !== props.index) {
    userClick.value = false
  }
})
</script>

<template>
  <li
    class="carousel-dots-dot"
    :class="{ 'is-active': current === index, 'is-revert': userClick }"
    @click="handleClick"
  >
    <div class="before"></div>
    <div class="after"></div>
  </li>
</template>

<style scoped>
.carousel
  .carousel-container
  .vui_carousel
  .carousel-footer
  .carousel-dots-dot {
  position: relative;
  display: inline-block;
  width: 8px;
  height: 8px;
  margin: 4px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.4);
  overflow: hidden;
  cursor: pointer;
}

.carousel
  .carousel-container
  .vui_carousel
  .carousel-footer
  .carousel-dots-dot.is-active {
  width: 14px;
  height: 14px;
  margin: 1px;
  background-color: transparent;
}

.carousel
  .carousel-container
  .vui_carousel
  .carousel-footer
  .carousel-dots-dot.is-active
  .before {
  background-color: #fff;
  animation: eat-haha-up-0d1b8730 0.8s;
}

.carousel
  .carousel-container
  .vui_carousel
  .carousel-footer
  .carousel-dots-dot.is-active
  .after {
  background-color: #fff;
  animation: eat-haha-down-0d1b8730 0.8s;
}

.carousel
  .carousel-container
  .vui_carousel
  .carousel-footer
  .carousel-dots-dot.is-active
  .before:after,
.carousel
  .carousel-container
  .vui_carousel
  .carousel-footer
  .carousel-dots-dot.is-active
  .after:before {
  background-color: #fff;
}

.carousel
  .carousel-container
  .vui_carousel
  .carousel-footer
  .carousel-dots-dot.is-revert
  .before {
  animation: eat-haha-down-0d1b8730 0.8s;
}

.carousel
  .carousel-container
  .vui_carousel
  .carousel-footer
  .carousel-dots-dot.is-revert
  .after {
  animation: eat-haha-up-0d1b8730 0.8s;
}

.carousel
  .carousel-container
  .vui_carousel
  .carousel-footer
  .carousel-dots-dot
  .before {
  position: absolute;
  top: 0;
  width: 14px;
  height: 7px;
  border-radius: 7px 7px 0 0;
  transform-origin: center bottom;
  will-change: transform;
}

.carousel
  .carousel-container
  .vui_carousel
  .carousel-footer
  .carousel-dots-dot
  .before:after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: -1px;
  width: 100%;
  height: 1px;
}

.carousel
  .carousel-container
  .vui_carousel
  .carousel-footer
  .carousel-dots-dot
  .after {
  position: absolute;
  bottom: 0;
  width: 14px;
  height: 7px;
  border-radius: 0 0 7px 7px;
  transform-origin: center top;
  will-change: transform;
}

.carousel
  .carousel-container
  .vui_carousel
  .carousel-footer
  .carousel-dots-dot
  .after:before {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  top: -1px;
  width: 100%;
  height: 1px;
}

@keyframes eat-haha-up-0d1b8730 {
  0% {
    transform: rotate(0);
  }

  25% {
    transform: rotate(-45deg);
  }

  50% {
    transform: rotate(0);
  }

  75% {
    transform: rotate(-45deg);
  }

  to {
    transform: rotate(0);
  }
}

@keyframes eat-haha-down-0d1b8730 {
  0% {
    transform: rotate(0);
  }

  25% {
    transform: rotate(45deg);
  }

  50% {
    transform: rotate(0);
  }

  75% {
    transform: rotate(45deg);
  }

  to {
    transform: rotate(0);
  }
}
</style>
