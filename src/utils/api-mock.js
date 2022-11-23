/**
 * mock数据接口
 */
import axios from "axios";
//创建自定义axios实例
const _axios_mock = axios.create({
    baseURL: '/mock',
    timeout: 5000
})
//请求拦截器
_axios_mock.interceptors.request.use(() => {})
//响应拦截器
_axios_mock.interceptors.response.use(() => {})

export default _axios_mock