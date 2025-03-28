<!--
  - Copyright (c) 2025.  Bubble
  -->

<script setup lang="ts">

</script>

<template>
  <div id="bilibili-player-placeholder">
    <div id="bilibili-player-placeholder-top"></div>
    <div id="bilibili-player-placeholder-bottom">
      <div id="bilibili-player-placeholder-bottom-left"></div>
      <div id="bilibili-player-placeholder-bottom-right"></div>
    </div>
  </div>
</template>

<style scoped>
#bilibili-player-placeholder {
  position: absolute;
  display: flex;
  z-index: 0;
  width: 100%;
  height: 100%;
  flex-direction: column;
  flex-wrap: nowrap;
  box-shadow: 0 0 8px var(--bg3);
  box-shadow: 0 0 8px var(--bg3);
}
#bilibili-player-placeholder-top {
  flex: 1;
  overflow: hidden;
  position: relative;
  background-color: #000;
}
#bilibili-player-placeholder-bottom {
  position: relative;
  display: flex;
  height: 46px;
  align-items: center;
  padding: 0 12px;
  background: var(--bg1);
  background: var(--bg1);
}
#bilibili-player-placeholder-bottom-left,
#bilibili-player-placeholder-bottom-right {
  background-color: rgba(0, 0, 0, 0.04);
}
#bilibili-player-placeholder-bottom-left {
  margin-right: 10px;
  width: 176px;
  height: 22px;
}
#bilibili-player-placeholder-bottom-right {
  height: 22px;
  flex-grow: 1;
}

</style>
