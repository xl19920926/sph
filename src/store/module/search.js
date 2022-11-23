import { getSearchList } from "@/api/index.js";
export default {
  //获取这边的数据需要store.search.state!!!
  state: {
    searchData: {}
  },
  getters: {},
  actions: {
    //获取搜索页展示数据
    async getSearchData(context, params = {}) {
      // console.log(context);
      let response = await getSearchList(params);
      context.commit('GETSEARCHDATA', response)
      //提交
      // context.commit('GETSEARCHDATA', response);
      // console.log(response.data);
      // context.state.data = response.data;
    }
  },
  mutations: {
    //提交搜索页展示数据变更
    GETSEARCHDATA(state, data) {
      state.searchData = data.data;
    },
    //上一页操作
    // PAGENOMIN(state){
    //   state.searchData.pageNo -= 1;
    // },
    //下一页操作
    // PAGENOADD(state){
    //   state.searchData.pageNo += 1;
    // }
  }
}