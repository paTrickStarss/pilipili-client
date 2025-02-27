<!--
  - Copyright (c) 2025.  Bubble
  -->

<script setup lang="ts">
import HomeAsideSection from '@/components/space/main/section/aside/HomeAsideSection.vue'
import { useUserStore } from '@/stores/user'
import { ref } from 'vue'

const userInfo = ref(useUserStore().userInfo)
</script>

<template>
  <HomeAsideSection>
    <div class="info-section">
      <div class="info-section__header">
        <div>个人资料</div>
        <a href="#" target="_blank">
          <div class="edit">
            <span>编辑</span>
            <i
              class="vui_icon sic-BDC-arrow_forward_right_line icon"
              style="font-size: 12px"
            />
          </div>
        </a>
      </div>
      <div class="info-section__content">
        <div class="info-item">
          <i class="vui_icon sic-fsp-uid_line icon" style="font-size: 20px" />
          <div class="vui_ellipsis multi-mode" style="-webkit-line-clamp: 1">
            {{ userInfo.uid }}
          </div>
        </div>
        <div class="info-item">
          <i class="vui_icon sic-fsp-cake_line icon" style="font-size: 20px" />
          <div class="vui_ellipsis multi-mode" style="-webkit-line-clamp: 1">
            {{ userInfo.uid }}
          </div>
        </div>
        <div class="info-item">
          <i
            class="vui_icon sic-fsp-school_line icon"
            style="font-size: 20px"
          />
          <div class="vui_ellipsis multi-mode" style="-webkit-line-clamp: 1">
            {{ userInfo.email }}
          </div>
        </div>
      </div>
    </div>
  </HomeAsideSection>
</template>

<style scoped>
.info-section {
  padding: 20px 16px 24px;
  background-color: var(--bg2);
  border-radius: 6px;
}

.space-home .aside .home-aside-section > div:first-child {
  margin-bottom: 10px;
}

.info-section__header {
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: var(--text1);
  font-size: 16px;
  font-weight: 500;
}

.info-section__header .edit {
  display: flex;
  align-items: center;
  color: var(--text2);
  font-size: 12px;
}

.info-section__header .edit .icon {
  margin-left: 4px;
}

.info-section__content .info-item {
  margin-top: 8px;
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: var(--text1);
}

.info-section__content .info-item:first-child {
  margin-top: 0;
}

.info-section__content .info-item .icon {
  color: var(--text2);
}
</style>
