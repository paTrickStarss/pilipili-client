<!--
  - Copyright (c) 2024-2025.  Bubble
  -->

<script setup lang="ts">
import { ref } from 'vue'
import { message } from 'ant-design-vue'
import IconInputClean from '@/components/icons/IconInputClean.vue'
import IconSearch from '@/components/icons/IconSearch.vue'
import SearchBarTrendingItem from '@/components/navbar/search/SearchBarTrendingItem.vue'

const searchInputRef = ref()
const searchPanelEnter = ref<boolean>(false)
const searchFormFocus = ref<boolean>(false)
const inputValue = ref<string>('')
const inputPlaceholder = ref<string>('输入搜索内容')

const onSearch = () => {
  const value = inputValue.value || inputPlaceholder.value
  message.info(`onSearch: ${value}`)
}
</script>

<template>
  <div class="center-search__bar">
    <form id="nav-searchform" :class="{ 'is-focus': searchFormFocus }">
      <div class="nav-search-content">
        <input
          ref="searchInputRef"
          class="nav-search-input"
          type="text"
          autocomplete="off"
          maxlength="100"
          v-model="inputValue"
          :placeholder="inputPlaceholder"
          @focus="searchFormFocus = true"
          @blur="
            () => {
              if (!searchPanelEnter) searchFormFocus = false
            }
          "
        />
        <div
          class="nav-search-clean"
          v-show="inputValue"
          @click="inputValue = ''"
        >
          <IconInputClean />
        </div>
      </div>
      <div class="nav-search-btn" @click="onSearch">
        <IconSearch />
      </div>
    </form>
    <div
      class="search-panel"
      v-show="searchFormFocus"
      @mouseenter="searchPanelEnter = true"
      @mouseleave="searchPanelEnter = false"
      @click="searchInputRef.focus()"
    >
      <div class="trending" style="max-width: 498px">
        <div class="header">
          <div class="title">pilipili热搜</div>
        </div>
        <div class="trending-double">
          <div class="trending-col" style="max-width: 244px">
            <SearchBarTrendingItem
              v-for="i in 5"
              :key="i"
              :title="`热搜标题热搜标题${i * 2 - 1}`"
              :rank="i * 2 - 1"
              :is-hot="true"
            />
          </div>
          <div class="trending-col" style="max-width: 244px">
            <SearchBarTrendingItem
              v-for="i in 5"
              :key="i"
              :title="`热搜标题热搜标题${i * 2}`"
              :rank="i * 2"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.pili-header .center-search-container .center-search__bar {
  position: relative;
  margin: 0 auto;
  min-width: 181px;
  max-width: 500px;
}

.pili-header .center-search-container .center-search__bar #nav-searchform {
  display: flex;
  align-items: center;
  padding: 0 48px 0 4px;
  position: relative;
  z-index: 1;
  overflow: hidden;
  line-height: 38px;
  border: 1px solid var(--line_regular);
  border-radius: 8px;
  height: 40px;
  background-color: var(--graph_bg_regular);
  opacity: 0.9;
  transition: background-color 0.3s;
}

.pili-header
  .center-search-container
  .center-search__bar
  #nav-searchform.is-focus {
  border: 1px solid var(--line_regular);
  border-bottom: none;
  background: var(--bg1);
  border-radius: 8px 8px 0 0;
}

.pili-header
  .center-search-container
  .center-search__bar
  #nav-searchform:hover {
  background: var(--bg1);
}

.pili-header .center-search-container .center-search__bar .nav-search-btn {
  position: absolute;
  top: 3px;
  right: 7px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 0;
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 6px;
  color: var(--text1);
  line-height: 32px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.pili-header .center-search-container .center-search__bar .nav-search-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  padding: 0 8px;
  width: 100%;
  height: 32px;
  border: 2px solid transparent;
  border-radius: 6px;
}

.pili-header
  .center-search-container
  .center-search__bar
  .nav-search-content
  .nav-search-input {
  flex: 1;
  overflow: hidden;
  padding-right: 8px;
  border: none;
  background-color: transparent;
  box-shadow: none;
  color: var(--text2);
  font-size: 14px;
  line-height: 20px;
}

.pili-header
  .center-search-container
  .center-search__bar
  #nav-searchform.is-focus
  .nav-search-content {
  background-color: var(--graph_bg_thick);
}

.pili-header
  .center-search-container
  .center-search__bar
  .nav-search-content
  .nav-search-clean {
  width: 16px;
  height: 16px;
  right: 10px;
  cursor: pointer;
}

.pili-header
  .center-search-container
  .center-search__bar
  .nav-search-content
  .nav-search-clean
  svg {
  position: absolute;
  color: var(--graph_weak);
}

.pili-header .search-panel {
  width: 100%;
  max-height: 612px;
  overflow-y: auto;
  background: var(--bg1);
  border: 1px solid var(--line_regular);
  border-top: none;
  border-radius: 0 0 8px 8px;
  padding: 13px 0 16px;
  -webkit-font-smoothing: antialiased;
}

.pili-header .trending-double {
  display: flex;
}

.pili-header .trending-double .trending-col {
  flex: 1;
}

.pili-header .trending-double .trending-col:first-child {
  margin-right: 10px;
}

.pili-header .header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
}

.pili-header .header .title {
  font-family:
    PingFang SC,
    HarmonyOS Sans SC,
    Helvetica Neue,
    Microsoft YaHei,
    sans-serif;
  font-weight: 500;
  height: 24px;
  font-size: 16px;
  line-height: 24px;
}
</style>
