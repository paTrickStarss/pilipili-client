<!--
  - Copyright (c) 2025.  Bubble
  -->

<script setup lang="ts">
import { ref } from 'vue'

defineProps({
  imageUrl: String,
  desc: String,
})

const imgRef = ref()
</script>

<template>
  <div class="vui_carousel__slide">
    <div class="carousel-area">
      <div class="carousel-area-img">
        <div class="extension-tips-v2"></div>
        <a class="carousel-item" href="#" target="_blank">
          <picture class="v-img carousel-inner__img">
            <source :srcset="imageUrl" type="image/avif" />
            <source srcset="" type="image/webp" />
            <img src="" :alt="desc" ref="imgRef" />
          </picture>
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.vui_carousel .vui_carousel__slide {
  -ms-flex-negative: 0;
  flex-shrink: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  outline: none;
}

.carousel
  .carousel-container
  .vui_carousel__slides
  .vui_carousel__slide
  .carousel-area {
  position: relative;
}

.carousel
  .carousel-container
  .vui_carousel__slides
  .vui_carousel__slide
  .carousel-area
  .extension-tips-v2 {
  pointer-events: none;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  padding-top: var(--cover-radio);
  background-color: var(--graph_bg_regular);
  border-radius: 6px;
  font-size: 14px;
  color: var(--text4);
  white-space: nowrap;
  display: block !important;
}

.carousel
  .carousel-container
  .vui_carousel__slides
  .vui_carousel__slide
  .carousel-area
  .extension-tips-v2:before {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -100%);
  content: '\8be5\5185\5bb9\88ab AdBlock\7c7b\63d2\4ef6\5c4f\853d';
}

.carousel
  .carousel-container
  .vui_carousel__slides
  .vui_carousel__slide
  .carousel-area
  .extension-tips-v2:after {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%);
  content: '\8bf7\68c0\67e5\63d2\4ef6\4ee5\6062\590d\6b63\5e38\5185\5bb9\5c55\793a';
}

.carousel
  .carousel-container
  .vui_carousel__slides
  .vui_carousel__slide
  .carousel-area
  .carousel-item {
  display: block;
  width: 100%;
  height: 100%;
  position: relative;
  background-color: var(--graph_bg_regular);
}

.vui_carousel .vui_carousel__slide img {
  width: 100%;
  height: 100%;
  display: block;
  -o-object-fit: contain;
  object-fit: contain;
}
</style>
