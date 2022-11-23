<script setup>
import { ref, computed } from 'vue';

const props = defineProps(["total", "pageSize", "pageNo", "pagerCount"]);
// console.log(props.pagerCount);
const pageStartNum = ref(1);
const pageEndNum = computed(() => Number.parseInt(props.total / props.pageSize) + 1);
</script>
<template>
  <div class="pagination">
    <button>上一页</button>
    <button>1</button>
    <button>...</button>

    <!-- 中间连续页码的地方:v-for、数组、对象、数字、字符串 -->
    <button>{{props.pageNo - 2}}</button>
    <button>{{props.pageNo - 1}}</button>
    <button>{{props.pageNo}}</button>
    <button>{{props.pageNo + 1}}</button>
    <button>{{props.pageNo + 2}}</button>

    <button>...</button>
    <button>{{ pageEndNum }}</button>

    <button>下一页</button>

    <button style="margin-left: 30px">共 {{ total }} 条</button>
  </div>
</template>

<script>
export default {
  name: "Pagination"
}
</script>

<style lang="less" scoped>
.pagination {
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>