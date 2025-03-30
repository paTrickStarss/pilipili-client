<!--
  - Copyright (c) 2025.  Bubble
  -->

<script setup lang="ts">
import { ref, watch } from 'vue'
import VideoCommentAvatar from '@/components/video/comment/VideoCommentAvatar.vue'
import VideoCommentContent from '@/components/video/comment/VideoCommentContent.vue'
import { message } from 'ant-design-vue'

const commentCount = ref<number>(7356)
const commentSortByHot = ref<boolean>(true)
const focusCommentEditor = ref<boolean>(false)

const newCommentInput = ref<string>('')
const syncDynamic = ref<boolean>(false)

const inputHeight = ref<number>(32)
let inputRow: number = 1
watch(newCommentInput, (newValue: string) => {
  const row = Math.ceil(newValue.length / 40)
  console.log('row', row, newValue.length, inputHeight.value)
  if (row !== inputRow) {
    if (row > inputRow) {
      inputHeight.value += Math.abs(row - inputRow) * 16
    } else {
      inputHeight.value -= Math.abs(row - inputRow) * 16
    }
    inputRow = row
  }
})

const commentInputRef = ref()
const footerEnter = ref<boolean>(false)
function onInputBlur() {
  setTimeout(() => {
    if (!footerEnter.value) {
      focusCommentEditor.value = false
    }
  })
}
function publishComment() {
  message.info(`发布评论：${newCommentInput.value}`)
  commentInputRef.value.focus()
}

</script>

<template>
  <div id="commentapp">
    <div class="">

<!--      头部：发布评论-->
      <div id="header">
<!--        通知栏-->
        <div id="notice"></div>

<!--        标题导航栏-->
        <div id="navbar">
          <div id="title">
            <h2>评论</h2>
            <div id="count">
              {{ commentCount }}
            </div>
          </div>
          <div id="sort-actions">
            <div class="bili-text-button text-button" :class="{'active' : commentSortByHot }">
              <button class="button" @click="commentSortByHot = true">
                <span class="button__label">
                  最热
                </span>
              </button>
            </div>
            <div class="sort-div"></div>
            <div class="bili-text-button text-button" :class="{'active' : !commentSortByHot }">
              <button class="button" @click="commentSortByHot = false">
                <span class="button__label">
                  最新
                </span>
              </button>
            </div>
          </div>
        </div>

        <div id="commentbox"
        >
          <div class="comment-box">
            <div id="user-avatar">
              <video-comment-avatar style="--avatar-width: 48px; --avatar-height: 48px;" />
            </div>

            <div id="comment-area"
                 tabindex="0">
              <div class="body">
                <div class="editor" :class="{ 'active': focusCommentEditor }">
                  <div class="input">
                    <div class="brt-root">
                      <textarea
                        ref="commentInputRef"
                        class="brt-editor"
                        :style="{ height: `${ inputHeight }px` }"
                        v-model="newCommentInput"
                        placeholder="进来来和UP唠会嗑呗"
                        @focus="focusCommentEditor = true"
                        @blur="onInputBlur"
                      />
                    </div>
                  </div>
                </div>

                <div
                  class="footer"
                  v-show="focusCommentEditor"
                  @mouseenter="footerEnter = true"
                  @mouseleave="footerEnter = false"
                >
<!--                  附件选项-->
                  <div id="optional">
                    <div class="bili-checkbox" @click="syncDynamic = !syncDynamic">
                      <span class="input">
                        <input
                          type="checkbox"
                          :checked="syncDynamic"
                        />
                        <span class="inner"></span>
                      </span>
                      <span class="label">同时转发到我的动态</span>
                    </div>
                  </div>

<!--                  发布按钮-->
                  <div id="pub">
                    <button
                      :class="{ 'active': newCommentInput.length > 0 }"
                      @click="publishComment"
                    >
                      发布
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

<!--      评论列表-->
      <video-comment-content />
    </div>
  </div>
</template>

<style scoped>
#commentapp {
  --bili-comments-font-size-title: 20px;
  --bili-comments-font-size-count: 13px;
  --bili-comments-font-size-sort: 13px;
  --bili-comments-font-size-name: 13px;
  --bili-comments-font-size-content: 15px;
  --bili-comments-line-height-content: 24px;
  --bili-comments-avatar-size: scale(0.83333333);
}
#commentapp {
  -webkit-font-smoothing: antialiased;
}

#notice {
  margin-bottom: 10px;
}

#navbar {
  display: flex;
  align-items: center;
  height: 28px;
  margin-bottom: 22px;
}
#title {
  display: var(--bili-comments-title-display, flex);
  align-items: center;
}
#title h2 {
  margin: 0px;
  color: var(--text1);
  font-weight: 500;
  font-size: var(--bili-comments-font-size-title, 20px);
}
#title #count {
  margin: 0 30px 0 6px;
  font-size: var(--bili-comments-font-size-count, 13px);
  font-weight: 400;
  color: var(--text3);
}
#sort-actions .bili-text-button {
  --_container-height: 28px;
  --_leading-space: 6px;
  --_trailing-space: 6px;
  --_label-text-size: var(--bili-comments-font-size-sort, 13px);
  --_label-text-color: var(--text3);
}
#sort-actions .bili-text-button.active {
  --_label-text-color: var(--text1);
}
#sort-actions .text-button {
  display: inline-flex;
  height: var(--_container-height);
  outline: none;
/*  font-family: var(--_label-text-font);*/
  font-size: var(--_label-text-size);
/*  line-height: var(--_label-text-line-height);
  font-weight: var(--_label-text-weight);*/
  -webkit-tap-highlight-color: transparent;
  vertical-align: middle;
}
#sort-actions .sort-div {
  display: inline-block;
  height: 11px;
  margin: 0 3px;
  border-left: solid 1px var(--text3);
  vertical-align: -2px;
}

.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  border: none;
  outline: none;
  user-select: none;
  appearance: none;
  background: rgba(0, 0, 0, 0);
  text-decoration: none;
  inline-size: 100%;
  position: relative;
  z-index: 0;
  height: 100%;
  font: inherit;
  color: var(--_label-text-color);
  padding-inline-start: var(--_leading-space);
  padding-inline-end: var(--_trailing-space);
  cursor: pointer;
}
.button::before {
/*  background-color: var(--_container-color);*/
  border-radius: inherit;
  content: "";
  inset: 0;
  position: absolute;
}


#commentbox {
  flex-shrink: 0;
  transition: height 0.2s;
  height: var(--bili-comments-commentbox-height, auto);
}
.comment-box {
  --bili-comment-box-display: flex;
  display: var(--bili-comment-box-display);
}
#user-avatar {
  flex-shrink: 0;
  width: 80px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}


#comment-area {
  position: relative;
  width: calc(100% - 80px);
}
#emoji-popover {
  position: absolute;
  left: 0;
}
#comment-area .body {
  width: 100%;
  transition: height 0.2s;
}
#comment-area .body .editor {
  display: flex;
  width: 100%;
  padding: 8px 0;
  border: 1px solid var(--Ga1);
  box-sizing: border-box;
  border-radius: 6px;
  background-color: var(--bg3);
  transition: 0.2s;
  cursor: text;
}
#comment-area .body .editor {
  --bili-comment-textarea-bg: transparent;
  --bili-comment-textarea-color: var(--text1);
  --bili-comment-textarea-placeholder-color: var(--text3);
  --bili-comment-textarea-padding: 8px;
  --bili-comment-textarea-font-size: 14px;
  --brt-line-height: 32px;
}
#comment-area .body .editor:hover,
#comment-area .body .editor.active {
  background-color: var(--bg1);
  border-color: var(--graph_weak);
}
#comment-area .body .editor .input {
  min-height: 32px;
  max-height: 100px;
  line-height: 32px;
  width: 100%;
  font-size: var(--bili-comment-textarea-font-size);
  font-family: inherit;
  box-sizing: border-box;
  color: var(--bili-comment-textarea-color);
  background-color: var(--bili-comment-textarea-bg);
}

.brt-root {
  position: relative;
  display: flex;
  align-items: center;
}
.brt-placeholder {
  position: absolute;
  left: var(--brt-editor-padding-hrz, 8px);
  top: var(--brt-editor-padding-vtc, 0);
  color: var(--brt-placeholder-color, var(--text3, #9499a0));
  font-size: var(--brt-font-size, 14px);
  line-height: var(--brt-line-height, 20px);
  pointer-events: none;
}
.brt-editor {
  outline: none;
  border: none;
  box-sizing: border-box;
  padding: var(--brt-editor-padding-vtc, 0) var(--brt-editor-padding-hrz, 8px);
  font-size: var(--brt-font-size, 14px);
  line-height: var(--brt-line-height, 20px);
  min-height: var(--brt-line-height, 20px);
  overflow-y: auto;
  max-height: 100px;
}

#comment-area .footer {
  position: relative;
  margin-top: 10px;
  display: flex;
  align-items: center;
}
.bili-checkbox {
  --bili-checkbox-size: 16px;
  --bili-checkbox-font-size: 14px;
  --bili-checkbox-border-width: 1px;
  --bili-checkbox-border-radius: 2px;
  --bili-checkbox-checked-color: var(--brand_blue);
  --bili-checkbox-margin-inline-end: 8px;
  display: inline-flex;
  align-items: baseline;
  padding: 0;
  margin: 0;
  cursor: pointer;
  margin-inline-end: var(--bili-checkbox-margin-inline-end);
}
#footer #optional .bili-checkbox {
  transform: scale(0.8);
}
.bili-checkbox .input {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  list-style: none;
  position: relative;
  display: inline-block;
  outline: none;
  cursor: pointer;
  align-self: center;
  border-radius: var(--bili-checkbox-border-radius);
  width: var(--bili-checkbox-size);
  height: var(--bili-checkbox-size);
}
.bili-checkbox .input input {
  bottom: 0;
  left: 0;
  margin: 0;
  opacity: 0;
  outline: none;
  position: absolute;
  right: 0;
  top: 0;
  z-index: -1;
}
.bili-checkbox .input .inner {
  display: block;
  background-color: var(--bg1_float);
  border: 1px solid var(--text4);
  border-radius: var(--bili-checkbox-border-radius);
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  transition: all .3s ease-in-out;
}
.bili-checkbox .input input[checked]+.inner {
  border-color: var(--bili-checkbox-checked-color);
  background-color: var(--bili-checkbox-checked-color);
}
.bili-checkbox .input .inner::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 25%;
  display: table;
  width: 4px;
  height: 8px;
  border: 2px solid var(--text_white);
  opacity: 0;
  border-top: 0;
  border-left: 0;
  transition: all .3s ease-in-out;
  transform: rotate(45deg) scale(0) translate(-50%, -50%);
}
.bili-checkbox .input input[checked]+.inner::after {
  transform: rotate(45deg) scale(1) translate(-65%, -50%);
  opacity: 1;
}
.bili-checkbox .label {
  margin-left: 8px;
  font-size: var(--bili-checkbox-font-size);
  color: var(--text2);
}

#pub {
  height: 32px;
  width: 70px;
  margin-left: auto;
}
#pub button {
  cursor: pointer;
  border-radius: 4px;
  outline: none;
  border: none;
  width: 100%;
  height: 100%;
  font-size: 16px;
  color: var(--text_white);
  background-color: rgba(var(--brand_blue_rgb), 0.5);
}
#pub button:hover, #pub button.active {
  background-color: var(--brand_blue);
}

textarea.brt-editor {
  min-height: 32px;
  width: 100%;
  line-height: 18px;
  resize: none;
  background-color: transparent;
  padding: 0 8px;
  box-sizing: border-box;
}

</style>
