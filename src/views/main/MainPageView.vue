<script setup lang="ts">

import IndexView from '@/views/index/IndexView.vue'
import RecommendedSwipe from '@/components/main/RecommendedSwipe.vue'
</script>

<template>
  <IndexView>
    <div class="feed2">

      <div class="recommended-container_floor-aside">
        <div class="container is-version8">
          <RecommendedSwipe/>

          <div style="height: 1200px"></div>
        </div>
      </div>
    </div>
  </IndexView>
</template>

<style scoped>
.recommended-container_floor-aside {
  padding-bottom: 60px;
}
.recommended-container_floor-aside:not(.xs_sm) {
  position: relative;
}
.recommended-container_floor-aside .container {
  grid-gap: 20px;
}
@media (min-width: 1400px) and (max-width: 1560px) {
  .recommended-container_floor-aside .container {
    display: grid;
    position: relative;
    width: 100%;
    grid-column: span 5;
    grid-template-columns: repeat(5, 1fr);
  }
}


.feed-roll-btn {
  position: absolute;
  left: 100%;
  top: 0;
  z-index: 2;
  transform: translate(10px);
}
</style>
