import { userLoginAPI, userLoginOutAPI, getUserInfoAPI } from "@/api";
export default {
  state: {
    token: localStorage.getItem('token') ?? '',
    userInfo: {}
  },
  getters: {},
  actions: {
    //登录
    async userLogin(context, obj) {
      // console.log(obj);
      let res = await userLoginAPI(obj.phone, obj.password);
      // console.log(res);
      if (res.code == 200) {
        localStorage.setItem('token', res.data.token);
        context.commit('USERLOGIN', res.data);
        return res;
      }else {
        return Promise.reject('失败');
      }
    },
    //退出登录
    async userLoginOut(context) {
      let res = await userLoginOutAPI();
      // console.log(res);
      if (res.code == 200) {
        context.commit('USERLOGINOUT');
        return 'ok'
      }else {
        return Promise.reject(new Error('失败'));
      }
    },
    //获取用户信息
    //手机号13700000000  密码111111
    async getUserInfo(context) {
      let res = await getUserInfoAPI();
      // console.log(res);
      context.commit('GETUSERINFO', res.data);
      // context.state.userInfo = res.data[0];
      // console.log(res);
    }
  },
  mutations: {
    USERLOGIN(state, data) {
      state.token = data.token;
      // localStorage.setItem('token', res.data.token);
    },
    GETUSERINFO(state, data) {
      state.userInfo = data;
    },
    USERLOGINOUT(state) {
      state.token = '';
      state.userInfo = {};
      localStorage.removeItem('token');
    }
  }

}