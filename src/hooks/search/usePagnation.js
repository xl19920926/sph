// 分页器hook
import { computed } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
export default () => {
  //引入路由
  const route = useRoute();
  const store = useStore();
  //当前页数字
  let pageNo = computed(() => store.state?.search?.searchData?.pageNo);
  //分页器开始数字
  let pageNumStart = computed(() => store.state.search.searchData.pageNo - 2);
  //分页器结束数字
  let pageNumEnd = computed(() => {
    if (store.state?.search?.searchData?.pageNo && store.state?.search?.searchData?.pageNo > 3 && store.state?.search?.searchData?.pageNo < store.state?.search?.searchData?.total - 2) {
      return store.state?.search?.searchData?.pageNo + 2;
    } else if (store.state?.search?.searchData?.pageNo >= store.state?.search?.searchData?.total - 2) {
      return store.state?.search?.searchData?.total;
    } else {
      return 5;
    }
  });
  //上一页操作
  const subPage = subPage => {
    if (subPage < 1) {
      return
    }else {
      store.dispatch("getSearchData", {
        //传递参数
        categoryname: route.query.categoryName,
        category1Id: route.query.category1Id,
        category2Id: route.query.category2Id,
        category3Id: route.query.category3Id,
        keyword: route.query.keyword,
        pageNo: subPage
      });
    }
  }
  //下一页操作
  const nextPage = (nextPage, pageTotal) => {
    if (nextPage > pageTotal) {
      return
    }else {
      store.dispatch("getSearchData", {
        //传递参数
        categoryname: route.query.categoryName,
        category1Id: route.query.category1Id,
        category2Id: route.query.category2Id,
        category3Id: route.query.category3Id,
        keyword: route.query.keyword,
        pageNo: nextPage
      });
    }
  }
  //翻页操作
  const changePage = page => {
    store.dispatch("getSearchData", {
      //传递参数
      categoryname: route.query.categoryName,
      category1Id: route.query.category1Id,
      category2Id: route.query.category2Id,
      category3Id: route.query.category3Id,
      keyword: route.query.keyword,
      pageNo: page
    });
  }
  return {
    pageNo,
    pageNumStart,
    pageNumEnd,
    changePage,
    subPage,
    nextPage
  }
}