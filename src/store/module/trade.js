import { getTradeInfoAPI, submitTradeAPI } from '@/api';
export default {
  state: {
    tradeInfo: {},
    tradeNo: ''
  },
  getters: {
    userAddress(state){
      return state?.tradeInfo?.userAddressList ?? []
    }
  },
  actions: {
    //获取订单页数据
    async getTradeInfo(context) {
      let res = await getTradeInfoAPI();
      context.commit('GETTRADEINFO',res)
    },
    //提交订单
    async submitTrade(context, data) {
      let res = await submitTradeAPI(data.tradeNo, data);
      if(res.code == 200) {
        //保存订单号
        context.commit('SETTRADENO',{tradtNo: res.data});
        return 'ok'
      }else {
        return Promise.reject(new Error('失败'));
      }
    },
    //选中样式回调
    userSelect(context, obj) {
      //排他操作
      context.state?.tradeInfo?.userAddressList.map(element => {
        element.isDefault = 0;
        if(element.id == obj.id) {
          element.isDefault = 1;
        }
      })
    }
  },
  mutations: {
    //修改订单页数据
    GETTRADEINFO(state,obj) {
      state.tradeInfo = obj.data;
    },
    //保存订单号
    SETTRADENO(state, obj) {
      state.tradeNo = obj.tradtNo;
    }
  }
}