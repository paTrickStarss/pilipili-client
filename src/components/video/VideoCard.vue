<script setup lang="ts">

defineProps({
  empty: {
    type: Boolean,
    default: false,
  }
})
</script>

<template>
  <div class="pili-video-card">
<!--    skeleton-->
    <div class="pili-video-card__skeleton" v-if="empty">
      <div class="pili-video-card__skeleton--cover"></div>
      <div class="pili-video-card__skeleton--info">
        <div class="pili-video-card__skeleton--right">
          <p class="pili-video-card__skeleton--text"></p>
          <p class="pili-video-card__skeleton--text short"></p>
          <p class="pili-video-card__skeleton--light"></p>
        </div>
      </div>
    </div>

<!--    content-->
  </div>
</template>

<style scoped>
.pili-video-card {
  position: relative;
  --title-font-size: 15px;
  --title-line-height: 22px;
  --subtitle-font-size: 13px;
  --subtitle-line-height: 17px;
  --info-margin-top: 8px;
  --avatar-size: 36px;
  --avatar-margin-right: 8px;
  --icon-size: 18px;
  --title-padding-right: 16px;
  --follow-icon-font-size: 12px;
  --follow-icon-line-height: 17px;
  --cover-radio: 56.25%;
  --no-interest-entry-size: 18px;
  --no-interest-icon-size: 36px;
  --no-interest-title-font-size: 14px;
  --no-interest-subtitle-font-size: 12px;
  --no-interest-btn-icon-size: 16px;
  --no-interest-btn-text-font-size: 13px;
  --no-interest-btn-horizontal-padding: 12px;
  --no-interest-btn-vertical-padding: 6px;
  --no-interest-module-gap: 24px;
}
@media (min-width: 1367px) and (max-width: 1700px) {
  .pili-video-card {
    --info-margin-top: 10px;
  }
}
.pili-video-card__skeleton {
  pointer-events: none;
  user-select: none;
}
.pili-video-card__skeleton--cover {
  padding-top: var(--cover-radio);
  border-radius: 6px;
  background-color: var(--graph_bg_regular);
}
.pili-video-card__skeleton--info {
  margin-top: var(--info-margin-top);
  display: -webkit-flex;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
}
.pili-video-card__skeleton--right {
  min-width: 0;
  flex: 1;
}
.pili-video-card__skeleton--text {
  margin-bottom: 4px;
  width: 94%;
  height: calc(var(--title-line-height) - 4px);
  border-radius: 4px;
  background-color: var(--graph_bg_regular);
}
.pili-video-card__skeleton--text.short {
  width: 72%;
}
.pili-video-card__skeleton--light {
  margin-top: 8px;
  width: 50%;
  height: var(--subtitle-line-height);
  border-radius: 4px;
  background-color: var(--graph_bg_regular);
}
</style>
