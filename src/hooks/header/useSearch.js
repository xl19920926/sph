import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
export default () => {
  const router = useRouter();
  const route = useRoute();
  const keyword = ref('');
  //搜索传参
  const search = () => {
    if (route.path == '/search') {
      //如果已在search路由，不跳转，合并参数
      router.push({
        name: 'search',
        //整理参数
        params: {
          keyword: keyword.value
        },
        query: {
          categoryName: route.query.categoryName,
          category1Id: route.query.category1Id,
          category2Id: route.query.category2Id,
          category3Id: route.query.category3Id
        }
      });
    } else {
      router.push({
        name: 'search',
        params: {
          keyword: keyword.value
        }
      })
    }
  }
  return {
    keyword,
    search
  }
}