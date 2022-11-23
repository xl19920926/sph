import { getCartList, updateCart, deleteCart, changeCheckedAPI } from "@/api";

export default {
  state: {
    cartInfoList: []
  },
  getters: {},
  actions: {
    //获取购物车 接口
    async getCartList(context) {
      let result = await getCartList();
      //此处后端接口返回数据结构设计有问题  需要自己处理一下
      context.state.cartInfoList = result.data[0]?.cartInfoList;
    },
    //更新购车车  接口
    async updateCartList(context, obj) {
      if (await updateCart(obj.skuId, obj.skuNum)) {
        //此步操作应等待修改请求的完成
        context.dispatch('getCartList');
      }
    },
    //删除购物车
    async deleteCartList(context, skuId) {
      if (await deleteCart(skuId)) {
        //此步操作应等待修改请求的完成
        context.dispatch('getCartList');
      }
    },
    //改变勾选状态
    async changeChecked(context, obj) {
      if (await changeCheckedAPI(obj.skuId, obj.checked)) {
        //此步操作应等待修改请求的完成
        context.dispatch('getCartList');
      }
    },
    //删除全部选中
    async deleteAll(context) {
      //创建promise任务列表
      let promiseList = [];
      // 遍历仓库的商品列表，进行删除购物车接口操作
      context.state.cartInfoList.forEach(item => {
        let promise = item.isChecked == 1 ? context.dispatch('deleteCartList', item.skuId) : null;
        promiseList.push(promise);
      });
      if (await Promise.all(promiseList)) {
        //等待promise.all完成后重新请求数据
        context.dispatch('getCartList');
      }
    },
    //全部勾选or不勾选
    async checkAll(context, obj) {
      let checked = obj.checked ? '1' : '0';
      //创建promise任务列表
      let promiseList = []; 
      // 遍历仓库的商品列表，进行删除购物车接口操作
      context.state.cartInfoList.forEach(item => {
        let promise = context.dispatch('changeChecked', {skuId: item.skuId, checked});
        promiseList.push(promise);
      });
      if (await Promise.all(promiseList)) {
        //等待promise.all完成后重新请求数据
        context.dispatch('getCartList');
      }
    }
  },
  mutations: {}
}