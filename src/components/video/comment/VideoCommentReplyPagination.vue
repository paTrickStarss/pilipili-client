<!--
  - Copyright (c) 2025.  Bubble
  -->

<script setup lang="ts">

import { computed, ref } from 'vue'

interface PaginationProps {
  pageNo: number;
  pageSize: number;
  total: number;
}
const props = defineProps<{
  pagination: PaginationProps
}>()

defineEmits({
  /**
   * 执行分页查询
   * @param pageNo
   * @param pageSize
   */
  query: (pageNo: number, pageSize: number) => !(pageNo < 1 || pageSize < 1)
})

const halfRange: number = 2;
const rangeRef = ref<number>(halfRange)
const totalPage = computed(() =>
  Math.ceil(props.pagination.total / props.pagination.pageSize)
)
// 当前页码范围
const currentPageRange = computed<Array<number>>(() => {
  if (totalPage.value > 7) {
    const pageNo: number = props.pagination.pageNo;

    // 左右边界
    let left: number = pageNo - halfRange;
    let right: number = pageNo + halfRange;

    // 调整左右边界，若有超出范围的相反方向要补齐差值（保证范围总页数为5）
    if (left < 1) {
      right = pageNo + (halfRange + (1 - left));
      left = 1;
    }
    if (right > totalPage.value) {
      left = pageNo - (halfRange + (right - totalPage.value));
      right = totalPage.value;
    }

    const page: Array<number> = [];
    for (let i = left; i <= right; i++) {
      page.push(i);
    }
    return page;
  }
  return [] as Array<number>
})

</script>

<template>
  <div class="pagination">
    <div class="pagination-head">
      <slot name="head">
        <span>共&nbsp;{{ totalPage }}&nbsp;页</span>
      </slot>
    </div>
<!--    小于七页全部展示-->
    <div class="pagination-body" v-if="totalPage <= 7">
      <!--      上一页-->
      <span
        v-show="pagination.pageNo > 1"
        class="page-op-btn"
        @click="$emit('query', pagination.pageNo - 1, pagination.pageSize)"
      >
        上一页
      </span>
      <span
        class="page-btn"
        :class="{ 'active': pageNo === pagination.pageNo }"
        v-for="pageNo in totalPage"
        :key="pageNo"
        @click="$emit('query', pageNo, pagination.pageSize)"
      >
        {{ pageNo }}
      </span>
      <!--      下一页-->
      <span
        v-show="pagination.pageNo < totalPage"
        class="page-op-btn"
        @click="$emit('query', pagination.pageNo + 1, pagination.pageSize)"
      >
        下一页
      </span>
    </div>

<!--    大于7页省略中间页数-->
    <div class="pagination-body" v-else>
      <!--      上一页-->
      <span
        v-show="pagination.pageNo > 1"
        class="page-op-btn"
        @click="$emit('query', pagination.pageNo - 1, pagination.pageSize)"
      >
        上一页
      </span>
<!--      第一页-->
      <span
        class="page-btn"
        v-if="pagination.pageNo > 1 + rangeRef"
        :class="{ 'active': 1 === pagination.pageNo }"
        @click="$emit('query', 1, pagination.pageSize)"
      >
        1&nbsp;&nbsp;...
      </span>
<!--      前五页-->
      <span
        class="page-btn"
        :class="{ 'active': pageNo === pagination.pageNo }"
        v-for="pageNo in currentPageRange"
        :key="pageNo"
        @click="$emit('query', pageNo, pagination.pageSize)"
      >
        {{ pageNo }}
      </span>
<!--      最后一页-->
      <span
        class="page-btn"
        v-if="pagination.pageNo < totalPage - rangeRef"
        :class="{ 'active': totalPage === pagination.pageNo }"
        @click="$emit('query', totalPage, pagination.pageSize)"
      >
        ...&nbsp;&nbsp;{{ totalPage }}
      </span>
<!--      下一页-->
      <span
        v-if="pagination.pageNo < totalPage"
        class="page-op-btn"
        @click="$emit('query', pagination.pageNo + 1, pagination.pageSize)"
      >
        下一页
      </span>
    </div>
    <div class="pagination-foot">
      <slot name="foot"></slot>
    </div>
  </div>
</template>

<style scoped>
.pagination {
  display: flex;
  align-items: center;
  font-size: 13px;
  color: var(--text2);
}
.pagination-head {
  margin-right: 10px;
}
.pagination-body {
  display: flex;
  align-items: center;
}
.pagination-body .page-btn {
  display: inline-flex;
  margin-left: 8px;
  cursor: pointer;
}
.pagination-body .page-btn:last-child,
.pagination-body .page-op-btn:last-child {
  margin-right: 12px;
}
.pagination-body .page-btn.active,
.pagination-body .page-btn:hover {
  color: #00a1d6;
}
.pagination-body .page-op-btn {
  display: inline-flex;
  margin-left: 8px;
  cursor: pointer;
}



</style>
