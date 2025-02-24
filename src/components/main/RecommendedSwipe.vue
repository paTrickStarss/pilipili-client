<script setup lang="ts">
import CarouselSlide from '@/components/main/CarouselSlide.vue'
import { ASSETS_BASE_URL } from '@/utils/imgUtil'
import VideoCard from '@/components/video/VideoCard.vue'
import { onMounted, ref } from 'vue'
import type { CarouselInfoType } from '@/types/PropsType'
import { deepCopy } from '@/utils/CommonUtil'

const props = defineProps({
  interval: {
    type: Number,
    default: 3,
  }
})

const slidesItems = ref<CarouselInfoType[]>([
  {
    id: 0,
    imageUrl: `${ASSETS_BASE_URL}/image/carousel-cover-1.jpg@800w_512h_.avif`,
    linkUrl: '',
    desc: '跟着一亿像素的相机一起走遍全球',
  },
  {
    id: 1,
    imageUrl: `${ASSETS_BASE_URL}/image/carousel-cover-2.jpg@800w_512h_.avif`,
    linkUrl: '',
    desc: '就当是一场梦，醒了很久还是很感动',
  },
  {
    id: 2,
    imageUrl: `${ASSETS_BASE_URL}/image/carousel-cover-3.jpg@800w_512h_.avif`,
    linkUrl: '',
    desc: '观众老爷请进！宝藏课程已上桌！',
  },
  {
    id: 3,
    imageUrl: `${ASSETS_BASE_URL}/image/carousel-cover-4.jpg@800w_512h_.avif`,
    linkUrl: '',
    desc: 'LPL淘汰赛直播中：TT vs BLG！',
  },
  {
    id: 4,
    imageUrl: `${ASSETS_BASE_URL}/image/carousel-cover-5.jpg@800w_512h_.avif`,
    linkUrl: '',
    desc: '这还是2025么？！全明星阵容！',
  },
])
const current = ref<number>(0)
let quartz: number = 0

function nextSlide() {
  current.value = (current.value + 1) % slidesItems.value.length
}

function autoPlay() {
  quartz = setInterval(() => {
    nextSlide()
  }, props.interval * 1000)
}
function pauseAutoPlay() {
  clearInterval(quartz)
}

onMounted(() => {
  slidesItems.value.push(deepCopy(slidesItems.value[0]))
  autoPlay()
})
</script>

<template>
  <div class="recommended-swipe grid-anchor" style="--cover-radio: 56.25%;">
    <div class="recommended-swipe-core" @mouseenter="pauseAutoPlay" @mouseleave="autoPlay">
      <div class="recommended-swipe-shim">
        <VideoCard empty style="--cover-radio: 56.25%;"/>
        <VideoCard empty style="--cover-radio: 56.25%;"/>
        <div class="shim-card"></div>
        <div class="shim-card"></div>
      </div>

      <div class="recommended-swipe-body">
        <div class="recommended-swipe-body-normal">
          <div class="carousel">
            <div class="carousel-container">
              <div
                class="vui_carousel vui_carousel--bottom vui_carousel--show-arrow"
                :style="{'--duration--time': `0.3s`}"
              >
                <div
                  class="vui_carousel__slides"
                  :class="{'last-item': current === 0}"
                  :style="{'--translate-x-slides': `-${current * 100}%`}"
                >
                  <CarouselSlide
                    v-for="item in slidesItems" :key="item.id"
                    :image-url="item.imageUrl" :desc="item.desc"
                  />
                </div>
                <div class="carousel-footer">
<!--                  <div class="carousel-footer-mask blur" :style="{'background-image': `url(${slidesItems[current].imageUrl})`}"></div>-->
                  <div class="carousel-footer-mask" style="background-color: rgb(158,158,158)"></div>
                  <div class="carousel-footer-text">
                    <div class="carousel-footer-title">
                      <a href="#" target="_blank">
                        <span>{{ slidesItems[current].desc || '' }}</span>
                      </a>
                    </div>
                  </div>
                  <div class="carousel-dots">
                    <ul class="carousel-dots-list">
                      <li
                        class="carousel-dots-dot"
                        v-for="i in slidesItems.length"
                        :key="i"
                      >
                        <div class="before"></div>
                        <div class="after"></div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.recommended-swipe {
  --cover-radio: 56.25%;
  /*grid-column: span 2;*/
  grid-column: 1/3;
  grid-row: 1/3;
}
.recommended-swipe-core {
  position: relative;
  width: 100%;
}
.recommended-swipe-shim {
  width: 100%;
  display: grid;
  grid-gap: 20px 12px;
  opacity: 0;
  visibility: hidden;
  user-select: none;
  pointer-events: none;
  grid-column: span 2;
  grid-row: span 2;
  grid-template-columns: repeat(2,1fr);
}
.recommended-container_floor-aside .recommended-swipe-shim {
  grid-gap: 20px;
}
.recommended-swipe-shim .shim-card {
  width: 100%;
  height: 0;
  padding-top: var(--cover-radio);
}


.recommended-swipe-body {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  border-radius: 6px;
  overflow: hidden;
  background-color: var(--graph_bg_regular);
}
.recommended-swipe-body-normal,
.recommended-swipe-body-error,
.recommended-swipe-body-loading,
.recommended-swipe-body-nothing {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: var(--graph_bg_regular);
}
.carousel {
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 0;
}
.carousel .carousel-container {
  position: relative;
  width: 100%;
  height: 100%;
}
.vui_carousel {
  --duration--time: .3s;
  position: relative;
  width: 100%;
  height: 100%;
  -ms-touch-action: pan-y;
  touch-action: pan-y;
  overflow: hidden;
}
.vui_carousel .vui_carousel__slides {
  --translate-x: 0%;
  --translate-x-slides: 0%;
  --current-translate-x: 0%;
  --prev-translate-x: -100%;
  --next-translate-x: 100%;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  width: 100%;
  height: 100%;
  -webkit-perspective: 1000px;
  perspective: 1000px;
  -webkit-transition-timing-function: ease-in-out;
  transition-timing-function: ease-in-out;
  -webkit-transition-property: -webkit-transform;
  transition-property: -webkit-transform;
  transition-property: transform,-webkit-transform;
  -webkit-transition-duration: var(--duration--time);
  transition-duration: var(--duration--time);
  -webkit-transform: translateX(var(--translate-x-slides));
  transform: translate(var(--translate-x-slides));
}
.carousel .carousel-container .vui_carousel .vui_carousel__slides {
  will-change: transform;
}
.carousel .carousel-container .vui_carousel .vui_carousel__slides.last-item {
/*  -webkit-transition-duration: 0s;
  transition-duration: 0s;*/
  transition-property: none;
}

.carousel .carousel-container .vui_carousel .carousel-footer-mask {
  transition: translate 0s;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  user-select: none;
  pointer-events: none;
  mask-image: linear-gradient(0,#2f3238 11%,transparent 20%);
  -webkit-mask-image: linear-gradient(0,#2f3238 11%,transparent 20%);
}
@media (min-width: 1367px) and (max-width: 1700px) {
  .carousel .carousel-container .vui_carousel .carousel-footer-mask {
    height: 810px;
  }
}
.carousel .carousel-container .vui_carousel .carousel-footer-mask.blur {
  backdrop-filter: blur(8px);
}
.carousel .carousel-container .vui_carousel .carousel-footer-text {
  position: absolute;
  z-index: 2;
  bottom: 42px;
  left: 15px;
  width: calc(100% - 100px);
}
.carousel .carousel-container .vui_carousel .carousel-footer-title {
  width: 100%;
  display: flex;
  align-items: center;
}
.carousel .carousel-container .vui_carousel .carousel-footer-text a {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.carousel .carousel-container .vui_carousel .carousel-footer-title a {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.carousel .carousel-container .vui_carousel .carousel-footer-text a span {
  display: block;
  line-height: 25px;
  color: #fff;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
@media (min-width: 1367px) and (max-width: 1700px) {
  .carousel .carousel-container .vui_carousel .carousel-footer-text a span {
    font-size: 18px;
  }
}
.carousel .carousel-container .vui_carousel .carousel-footer .carousel-dots {
  position: absolute;
  left: 15px;
  bottom: 20px;
  margin: -1.5px;
  z-index: 2;
}
.carousel .carousel-container .vui_carousel .carousel-footer .carousel-dots-list {
  display: flex;
}
.carousel .carousel-container .vui_carousel .carousel-footer .carousel-dots-dot {
  position: relative;
  display: inline-block;
  width: 8px;
  height: 8px;
  margin: 4px;
  border-radius: 50%;
  background-color: rgba(255,255,255,.4);
  overflow: hidden;
  cursor: pointer;
}
.carousel .carousel-container .vui_carousel .carousel-footer .carousel-dots-dot.is-active {
  width: 14px;
  height: 14px;
  margin: 1px;
  background-color: transparent;
}
.carousel .carousel-container .vui_carousel .carousel-footer .carousel-dots-dot.is-active .before {
  background-color: #fff;
  animation: eat-haha-up-0d1b8730 .8s;
}
.carousel .carousel-container .vui_carousel .carousel-footer .carousel-dots-dot.is-active .after {
  background-color: #fff;
  animation: eat-haha-down-0d1b8730 .8s;
}
.carousel .carousel-container .vui_carousel .carousel-footer .carousel-dots-dot.is-active .before:after,
.carousel .carousel-container .vui_carousel .carousel-footer .carousel-dots-dot.is-active .after:before {
  background-color: #fff;
}
.carousel .carousel-container .vui_carousel .carousel-footer .carousel-dots-dot .before {
  position: absolute;
  top: 0;
  width: 14px;
  height: 7px;
  border-radius: 7px 7px 0 0;
  transform-origin: center bottom;
  will-change: transform;
}
.carousel .carousel-container .vui_carousel .carousel-footer .carousel-dots-dot .before:after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: -1px;
  width: 100%;
  height: 1px;
}
.carousel .carousel-container .vui_carousel .carousel-footer .carousel-dots-dot .after {
  position: absolute;
  bottom: 0;
  width: 14px;
  height: 7px;
  border-radius: 0 0 7px 7px;
  transform-origin: center top;
  will-change: transform;
}
.carousel .carousel-container .vui_carousel .carousel-footer .carousel-dots-dot .after:before {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  top: -1px;
  width: 100%;
  height: 1px;
}

.carousel .carousel-container .vui_carousel .carousel-arrows {
  position: absolute;
  z-index: 2;
  display: flex;
  align-items: flex-end;
  bottom: 42px;
  right: 15px;
}
.carousel .carousel-container .vui_carousel .carousel-arrows button {
  display: -webkit-flex;
  display: flex;
  align-items: center;
  justify-content: center;
  display: -webkit-inline-flex;
  display: inline-flex;
  width: 28px;
  height: 28px;
  border-radius: 8px;
  margin-right: 12px;
  background-color: rgba(255,255,255,.1);
}
.carousel .carousel-container .vui_carousel .carousel-arrows button svg {
  color: #fff;
  width: 12px;
  height: 12px;
}


@keyframes eat-haha-up-0d1b8730 {
  0% {
    transform: rotate(0)
  }

  25% {
    transform: rotate(-45deg)
  }

  50% {
    transform: rotate(0)
  }

  75% {
    transform: rotate(-45deg)
  }

  to {
    transform: rotate(0)
  }
}
@keyframes eat-haha-down-0d1b8730 {
  0% {
    transform: rotate(0)
  }

  25% {
    transform: rotate(45deg)
  }

  50% {
    transform: rotate(0)
  }

  75% {
    transform: rotate(45deg)
  }

  to {
    transform: rotate(0)
  }
}

</style>
