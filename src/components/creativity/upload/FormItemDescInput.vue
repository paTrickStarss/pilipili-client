<!--
  - Copyright (c) 2025.  Bubble
  -->

<script setup lang="ts">

const inputValue = defineModel('value',
  { type: String, required: true }
);
</script>

<template>
  <div class="archive-info-editor" style="height: 160px">
    <div class="ql-container">
      <textarea
        class="textarea-editor"
        placeholder="填写视频简介"
        maxlength="2000"
        v-model="inputValue"
      />
      <div class="mention-max">
        <span>{{ inputValue.length }}</span>
        /2000
      </div>
<!--      <div-->
<!--        class="ql-editor ql-blank"-->
<!--        contenteditable="true"-->
<!--        :data-placeholder="inputValue.length === 0? '填写视频简介':''"-->
<!--      >-->
<!--        <p></p>-->
<!--      </div>-->
    </div>
  </div>
</template>

<style scoped>
.archive-info-editor {
  position: relative;
}
.ql-container {
  box-sizing: border-box;
  font-family: Helvetica,Arial,sans-serif;
  font-size: 13px;
  height: 100%;
  margin: 0;
  position: relative;
}
/*.archive-info-editor .editor {
  border: 1px solid #ccc;
  border-radius: 8px;
}*/
.textarea-editor {
  height: 100%;
  width: 100%;
  font-size: 14px;
  overflow-y: auto;
  padding: 12px 60px 12px 15px;
  border: 1px solid #ccc;
  border-radius: 8px;
  resize: none;
  outline: none;
  transition: border-color .3s;
}
.textarea-editor:focus {
  border: 1px solid #00a1d6;
  border-radius: 8px;
}
/*.ql-editor {
  box-sizing: border-box;
  line-height: 1.42;
  height: 100%;
  outline: none;
  overflow-y: auto;
  padding: 12px 15px;
  -o-tab-size: 4;
  tab-size: 4;
  -moz-tab-size: 4;
  text-align: left;
  white-space: pre-wrap;
  word-wrap: break-word;
}
.ql-editor {
  padding-right: 60px;
  position: relative;
}*/
.ql-editor.ql-blank:before {
  color: rgba(0,0,0,.6);
  content: attr(data-placeholder);
  font-style: italic;
  left: 15px;
  pointer-events: none;
  position: absolute;
  right: 15px;
}
.ql-editor.ql-blank:before {
  font-style: normal;
  color: #999;
}
.ql-clipboard {
  left: -100000px;
  height: 1px;
  overflow-y: hidden;
  position: absolute;
  top: 50%;
}

.archive-info-editor .mention-max {
  display: flex;
  color: #9ba4ac;
  font-size: 12px;
  position: absolute;
  bottom: 16px;
  right: 20px;
}
</style>
