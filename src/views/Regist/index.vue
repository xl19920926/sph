<!-- Regist组件 -->
<script setup>
import { reactive, onMounted } from "vue";
import { useRouter } from 'vue-router';
import { useStore } from "vuex";
import nprogress from "nprogress";
const router = useRouter();
const store = useStore();
//验证码dom
// const codeInput = ref(null);
const state = reactive({
  phone: '', //手机号
  code: '', //验证码
  passWord1: '', //密码1
  passWord2: '', //密码2
  isAgree: false  //同意协议
})
//获取验证码回调
const getCode = async phone => {
  // console.log('获取验证码');
  if (state.phone) {
    try {
      let res = await store.dispatch('getCode', { phone });
      //如果成功修改input值
      // console.log(res);
      // console.log(codeInput);
      // codeInput.value.value = res;
      state.code = res;
    } catch (error) {
      alert('注册失败')
    }
  }else {
    alert('手机号不能为空')
  }
}
//用户点击注册回调
const toLogin = () => {
  // console.log('tologin');
  // console.log(store.state.regist);
  if ((state.phone && state.passWord1 && state.passWord2 && state.isAgree) && state.code == store.state.regist.code) {
    alert('注册成功');
    router.push('/login');
  }
  else {
    alert('信息输入不正确');
    return
  }
}
onMounted(() => {
  nprogress.start();
  nprogress.done();
})
</script>
<template>
  <!-- 注册内容 -->
  <div class="register">
    <h3>
      注册新用户
      <span class="go">我有账号，去 <router-link to="/login">登陆</router-link>
      </span>
    </h3>
    <div class="content">
      <label>手机号:</label>
      <input type="text" placeholder="请输入你的手机号" v-model="state.phone" />
      <span class="error-msg">错误提示信息</span>
    </div>
    <div class="content">
      <label>验证码:</label>
      <input type="text" placeholder="请输入验证码" v-model="state.code" />
      <button style="margin-left: 10px; height: 38px;vertical-align: top;"
        v-on:click.prevent="getCode(state.phone)">获取验证码</button>
      <span class="error-msg">错误提示信息</span>
    </div>
    <div class="content">
      <label>登录密码:</label>
      <input type="text" placeholder="请输入你的登录密码" v-model="state.passWord1" />
      <span class="error-msg">错误提示信息</span>
    </div>
    <div class="content">
      <label>确认密码:</label>
      <input type="text" placeholder="请输入确认密码" v-model="state.passWord2" />
      <span class="error-msg">错误提示信息</span>
    </div>
    <div class="controls">
      <input name="m1" type="checkbox" v-model="state.isAgree" />
      <span>同意协议并注册《尚品汇用户协议》</span>
      <span class="error-msg">错误提示信息</span>
    </div>
    <div class="btn">
      <button @click.prevent="toLogin()">完成注册</button>
    </div>
  </div>
</template>
<script>
export default {
  name: "Regist",
};
</script>
<style scoped lang="less">
.register {
  width: 1200px;
  height: 445px;
  border: 1px solid rgb(223, 223, 223);
  margin: 0 auto;

  h3 {
    background: #ececec;
    margin: 0;
    padding: 6px 15px;
    color: #333;
    border-bottom: 1px solid #dfdfdf;
    font-size: 20.04px;
    line-height: 30.06px;

    span {
      font-size: 14px;
      float: right;

      a {
        color: #e1251b;
      }
    }
  }

  div:nth-of-type(1) {
    margin-top: 40px;
  }

  .content {
    padding-left: 390px;
    margin-bottom: 18px;
    position: relative;

    label {
      font-size: 14px;
      width: 96px;
      text-align: right;
      display: inline-block;
    }

    input {
      width: 270px;
      height: 38px;
      padding-left: 8px;
      box-sizing: border-box;
      margin-left: 5px;
      outline: none;
      border: 1px solid #999;
    }

    img {
      vertical-align: sub;
    }

    .error-msg {
      position: absolute;
      top: 100%;
      left: 495px;
      color: red;
    }
  }

  .controls {
    text-align: center;
    position: relative;

    input {
      vertical-align: middle;
    }

    .error-msg {
      position: absolute;
      top: 100%;
      left: 495px;
      color: red;
    }
  }

  .btn {
    text-align: center;
    line-height: 36px;
    margin: 17px 0 0 55px;

    button {
      outline: none;
      width: 270px;
      height: 36px;
      background: #e1251b;
      color: #fff !important;
      display: inline-block;
      font-size: 16px;
    }
  }
}
</style>