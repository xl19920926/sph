import { getBaseCategoryListAPI } from "@/api/index";
export default {
  state: {
    //三级导航数据
    baseCategoryList: {}
  },
  getters: {},
  actions: {
    async getBaseCategoryList(context, obj) {
      let res = await getBaseCategoryListAPI();
      context.commit('GETBASECATEGOTYLIST', res)
    }
  },
  mutations: {
    GETBASECATEGOTYLIST(state, data) {
      state.baseCategoryList = data.data;
    }
  }
}