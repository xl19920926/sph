//仓库
import { createStore } from 'vuex';
import nav from './module/nav';
import home from './module/home';
import search from './module/search';
import login from './module/login';
import regist from './module/regist';
import detail from './module/detail';
import cart from './module/cart';
import trade from './module/trade';
import pay from './module/pay';
import order from './module/order';
import { v4 as uuidv4 } from "uuid";

export default createStore({
  //根组件的数据
  state: {
    uuid: ''
  },
  getters: {},
  actions: {
    generateUUID(context) {
      // console.log(uuidv4());
      // console.log(context);
      //如果本地存储中没有uuid则生成一个uuid，并在本地存储
      if (localStorage.getItem('uuid')) {
        context.state.uuid = localStorage.getItem('uuid');
      } else {
        context.state.uuid = uuidv4();
        localStorage.setItem("uuid", context.state.uuid);
      }
      // console.log(context.state.uuid);
    }
  },
  mutations: {},
  //模块化仓库
  modules: {
    home,
    search,
    login,
    regist,
    detail,
    cart,
    trade,
    pay,
    order,
    nav
  }
});