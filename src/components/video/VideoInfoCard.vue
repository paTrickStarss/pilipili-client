<script setup lang="ts">

import { ref } from 'vue'
import imgUtil from '@/utils/imgUtil'

const title = ref<string>('This is a video title.')

</script>

<template>
  <div class="video-info-card">
    <div class="video-cover">
      <a-image
        height="100%"
        width="100%"
        src="src/assets/image/OIP-C.jpg"
        :fallback="imgUtil.errorImg"
      />
    </div>
    <div class="video-title">
      {{ title }}
    </div>
  </div>
</template>

<style scoped>
.video-info-card {
  margin: 10px 15px;
}
.video-cover {
  margin: 0 5px;
  height: 100px;
  width: 100%
}

</style>
