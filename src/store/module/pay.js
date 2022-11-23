import { getPayInfoAPI, getPayStatusAPI } from '@/api';

export default {
  state: {
    payInfo: {}
  },
  getters: {},
  actions: {
    //请求支付信息
    async getPayInfo(context, orderId) {
      let res = await getPayInfoAPI(orderId);
      // console.log(res);
      context.commit('GETPAYINFO', res.data);
    },
    //查询支付状态
    async getPayStatus(context, orderId) {
      // console.log(orderId);
      let res = await getPayStatusAPI(orderId);
      // console.log(res);
      if(res.code == 200) {
        return 'ok'
      }else {
        return Promise.reject(new Error('失败'));
      }
    }
  },
  mutations: {
    GETPAYINFO(state, data) {
      state.payInfo = data;
    }
  }
}