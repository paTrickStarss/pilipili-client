<script setup lang="ts">

import HomeSectionTop from '@/components/space/main/section/top/HomeSectionTop.vue'
import HomeSectionVideo from '@/components/space/main/section/video/HomeSectionVideo.vue'
</script>

<template>
  <main class="space-main">
    <div class="space-home">
      <div class="content">
        <HomeSectionTop/>
        <HomeSectionVideo/>
      </div>

      <div class="aside">

      </div>
    </div>

    <div class="space-float">

    </div>
  </main>
</template>

<style scoped>
#app .space-main {
  --side-padding: 60px;
  max-width: 2260px;
  margin: 0 auto;
  padding: 0 var(--side-padding);
  min-height: calc(100vh - 294px);
}
@media (min-width: 0) {
  #app .space-main {
    min-width: 1100px;
  }
}
@media (min-width: 1100px) {
  #app .space-main {
    min-width: 1100px;
  }
}
.space-home {
  margin-top: 30px;
  display: flex;
}
.space-home .content {
  flex: 1;
}



.space-home .aside {
  flex-shrink: 0;
  width: var(--aside-width);
  --aside-width: 240px;
  margin-left: 36px;
}


#app .space-float {
  z-index: 1;
  position: fixed;
  right: 10px;
  left: calc(100% - 52px);
  bottom: 20px;
  width: 42px;
  height: 150px;
  font-size: 12px;
}

</style>
