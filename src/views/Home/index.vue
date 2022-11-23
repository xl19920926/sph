<!-- Home组件 -->
<script setup>
import { reactive, onMounted } from 'vue';
import { useStore } from 'vuex';
import Banner from "./Banner/index.vue";
import Recommend from "./Recommend/index.vue";
import Rank from "./Rank/index.vue";
import Like from "./Like/index.vue";
import Floor from "./Floor/index.vue";
import Brand from "./Brand/index.vue";
const store = useStore();
const state = reactive({
  floorData: null
})
onMounted(() => {
  function sendAjax(method, url) {
      return new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.onreadystatechange = () => {
              if (xhr.status == 200 && xhr.readyState == 4) {
                  resolve(JSON.parse(xhr.response).data);
              }
          };
          xhr.open(method, url);
          // "http://gmall-h5-api.atguigu.cn/api/product/getBaseCategoryList"
          xhr.send();
      });
  }
  (async function getFloor() {
    const floorData = await sendAjax("get", "mock/floor");
    state.floorData = floorData;
  })();
});
</script>
<template>
  <Banner></Banner>
  <Recommend></Recommend>
  <Rank></Rank>
  <Like></Like>
  <Floor v-for="data in state.floorData" v-bind:key="data.id" v-bind:data="data"></Floor>
  <Brand></Brand>
</template>
<script>
export default {
  name: "Home",
  components: {
    Banner,
    Recommend,
    Rank,
    Like,
    Floor,
    Brand,
  }
};
</script>