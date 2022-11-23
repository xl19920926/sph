import { getOrderListAPI } from '@/api'
export default {
  state: {
    orderList: null
  },
  getters: {},
  actions: {
    //获取订单列表
    async getOrderList(context, {page, limit}) {
      let res = await getOrderListAPI(page, limit);
      context.commit('GETORDERLIST', res)
    }
  },
  mutations: {
    GETORDERLIST(state, data) {
      state.orderList = data.data;
    }
  }
}