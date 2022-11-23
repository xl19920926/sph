import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
export default () => {
  const store = useStore();
  const router = useRouter();
  const currentIndex = ref(-1);
  // 三级导航跳转业务
  const toSearch = event => {
    if (event.target.dataset.categoryname) {
      let querys = {
        categoryName: event.target.dataset.categoryname
      };
      if (event.target.dataset.category1id) {
        querys.category1Id = event.target.dataset.category1id;
      } else if (event.target.dataset.category2id) {
        querys.category2Id = event.target.dataset.category2id;
      } else if (event.target.dataset.category3id) {
        querys.category3Id = event.target.dataset.category3id;
      }
      router.push({
        path: "/search",
        query: querys
      });
    }
  }
  // 1级导航鼠标移入事件
  const itemHover = index => {
    currentIndex.value = index;
  }

  // 1级导航鼠标移除事件
  const itemLeave = index => {
    currentIndex.value = -1;
  }
  onMounted(() => {
    //请求三级导航数据
    store.dispatch('getBaseCategoryList');
  });
  return {
    currentIndex,
    toSearch,
    itemHover,
    itemLeave
  }
}