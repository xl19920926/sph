import { getDetail, updateCart } from "@/api/index.js";
export default {
  actions: {
    //请求详情页数据
    //参数最多只能接受2个!!!!
    async getDetailInfo(context, skuid="") {
      let res = await getDetail(skuid);
      context.commit('GETDETAILINFO', res);
    },
    async updateCart(context, {skuId, skuNum}) {
      // console.log(skuId, skuNum);
      let result = await updateCart(skuId, skuNum);
      if(result.code == 200) {
        return "ok";
      }else {
        return Promise.reject(new Error('请求失败'));
      }
    }
  },
  mutations: {
    GETDETAILINFO(state, response) {
      state.data = response.data;
    }
  },
  state: {
      data: {}
  },
  getters: {
    category1Name(state) {
      return state.data?.categoryView?.category1Name;
    },
    category2Name(state) {
      return state.data?.categoryView?.category2Name;
    },
    category3Name(state) {
      return state.data?.categoryView?.category3Name;
    },
    skuName(state) {
      return state.data?.skuInfo?.skuName;
    }
  }
}