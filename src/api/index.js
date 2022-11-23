//导入真实数据接口
import api from '@/utils/api.js';
// 导入mock数据接口
// import api_mock from '@/utils/api-mock.js';

//请求三级导航
export const getBaseCategoryListAPI = () => api.get('product/getBaseCategoryList');
//搜索商品  参数至少是空对象
export const getSearchList = (data={}) => api.post('list',data);
//请求商品详情
export const getDetail = skuid => api.get(`item/${skuid}`);
//加入、更新 购物车请求
export const updateCart = (skuId, skuNum) => api.post(`cart/addToCart/${skuId}/${skuNum}`);
//获取购物车数据
export const getCartList = () => api.get('cart/cartList');
//删除购物车
export const deleteCart = skuId => api.delete(`cart/deleteCart/${skuId}`);
//改变勾选状态
export const changeCheckedAPI = (skuId, checked) => api.get(`cart/checkCart/${skuId}/${checked}`);
//注册也获取验证码
export const getCodeAPI = phone => api.get(`user/passport/sendCode/${phone}`);
//用户登录
export const userLoginAPI = (phone, password) => api.post('user/passport/login', {phone, password});
//获取用户信息
export const getUserInfoAPI = () => api.get('user/passport/auth/getUserInfo');
//获取订单交易页数据
export const getTradeInfoAPI = () => api.get('order/auth/trade');
//退出登录
export const userLoginOutAPI = () => api.get('user/passport/logout');
//提交订单 /api/order/auth/submitOrder?tradeNo={tradeNo}    post
export const submitTradeAPI = (tradeNo, data) => api.post(`order/auth/submitOrder?tradeNo=${tradeNo}`, data);
//请求支付信息  /api/payment/weixin/createNative/{orderId}   get
export const getPayInfoAPI = orderId => api.get(`payment/weixin/createNative/${orderId}`);
//查询支付状态   /api/payment/weixin/queryPayStatus/{orderId}   post
export const getPayStatusAPI = orderId => api.post(`payment/weixin/queryPayStatus/${orderId}`);
//获取我的订单列表 order/auth/{page}/{limit}  get
export const getOrderListAPI = (page, limit) => api.get(`order/auth/${page}/${limit}`)