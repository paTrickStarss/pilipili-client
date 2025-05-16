<!--
  - Copyright (c) 2025.  Bubble
  -->

<script setup lang="ts">

import IndexView from '@/views/index/IndexView.vue'
import NavSliderBar from '@/components/creativity/NavSliderBar.vue'


</script>

<template>
  <IndexView type="body">
    <div id="root" class="ct-root">
      <NavSliderBar />

      <div id="cc-body" class="cc-body cc-body-microapp-wrap" style="height: 100%">
        <RouterView />
      </div>
    </div>

  </IndexView>
</template>

<style>
.ct-root {
  box-sizing: border-box;
  height: 100%;
}
.ct-root *, .ct-root :after, .ct-root :before {
  box-sizing: inherit;
}

.cc-body {
  position: relative;
}
.cc-body.cc-body-microapp-wrap {
  padding-bottom: 0!important;
}
#app .cc-body {
  margin-left: 200px;
  padding-top: 60px;
  padding-left: 0;
  padding-right: 0;
  min-width: 1124px;
  display: flow-root;
  min-height: 100%;
}
.upload-wrap {
  height: 100%;
  margin-top: 16px;
}
.upload-wrap.upload-wrap-full-screen .upload-wrap {
  margin-top: 0;
}
.cc-body.cc-body-microapp-wrap .cc-content-body {
  width: 100%!important;
  padding: 0!important;
  margin-left: 0!important;
  margin-right: 0!important;
  margin-top: 0!important;
}
.york_videoup_wrapper {
  width: 100%;
  height: 100%;
}
.cc-body.cc-body-microapp-wrap .microapp-comp-container {
  height: 100%;
}



.side-utils {
  position: fixed;
  bottom: 140px;
  right: 0;
  z-index: 100;
}
</style>
