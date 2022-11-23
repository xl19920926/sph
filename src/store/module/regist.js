import { getCodeAPI } from "@/api";

export default {
    actions: {
      //验证码操作
      async getCode(context, obj) {
        let res = await getCodeAPI(obj.phone);
        if (res.code == 200) {
          // console.log(res.data);
          context.state.code = res.data;
          return res.data;
        }
        else {
          return Promise.reject('失败');
        }
      }
    },
    mutations: {},
    state: {
      code: '',
    },
    getters: {}
}