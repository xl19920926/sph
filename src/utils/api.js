/**
 * axios二次封装
 */
 import store from '@/store';
import axios from "axios";
import nProgress from "nprogress";
import "nprogress/nprogress.css";
//创建自定义axios实例
const api = axios.create({
    baseURL: 'http://gmall-h5-api.atguigu.cn/api/',
    timeout: 5000
})
//请求拦截器
api.interceptors.request.use((config) => {//请求拦截器,参数为发送请求的axios实例配置项
    //发起请求时开始进度条
    nProgress.start();
    // console.log(store);
    //设置所有求情的请求头
    if(store.state.uuid) {
      config.headers.userTempId = store.state.uuid;
    }
    if(store.state.login.token) {
      // console.log(store.state.login.token);
      config.headers.token = store.state.login.token;
    }
    return config;  //返回config放行拦截器
}, (error) => {})
//响应拦截器
api.interceptors.response.use((response) => {//响应拦截器,参数为收到的响应response对象
    //响应完成后结束进度条
    nProgress.done();
    return response?.data;  //返回response放行拦截器
}, (error) => {})

export default api;