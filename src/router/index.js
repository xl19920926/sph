/**
 * 路由入口文件
 */
import { createRouter, createWebHashHistory } from 'vue-router';
import notFound from '@/router/routes/notFound';
import home from '@/router/routes/home';
import search from '@/router/routes/search';
import detail from '@/router/routes/detail';
import login from '@/router/routes/login';
import regist from '@/router/routes/regist';
import cart from '@/router/routes/cart';
import addCart from '@/router/routes/addCart';
import order from '@/router/routes/order';
import pay from '@/router/routes/pay';
import paySuccess from '@/router/routes/paySuccess';
import trade from '@/router/routes/trade';
import nProgress from 'nprogress';
import "nprogress/nprogress.css";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    notFound,
    home,
    search,
    detail,
    cart,
    addCart,
    login,
    regist,
    order,
    pay,
    paySuccess,
    trade
  ]
});
//路由权限鉴定
//全局前置路由守卫
router.beforeEach((to, from, next) => {
  // console.log(from,to);
  //切换路由时开始进度条
  nProgress.start();
  if (to.meta.auth) {
    //如果存在token，证明已经登录，进入登录、注册、购物车、订单页面时重定向至首页
    //如果token存在表示已经登录
    if (localStorage.getItem('token')) {
      //判断是否已经登录，已经登录则不能再进入登录注册路由
      if (to.path == '/login' || to.path == '/regist') {
        next('/');
      } else {
        //除了登陆注册页面其他直接放行
        next();
      }
    } else {//没有token  未登录情况
      // next();
      //没有token，除了登录，注册其他路由无权访问
      if (to.path == '/cart' || to.path == '/order') {
        let toPath = to.path;
        alert('请先登录');
        //放行至login时通过query参数携带进来时想去的路由地址  保存
        next(`/login?redirct=${toPath}`);
      } else {
        next();
      }
    }
  } else { // 不需要鉴权则直接放行
    next();
  }
})

//全局后置路由守卫
router.afterEach((to, from) => {
  //路由跳转后结束进度条
  nProgress.done();
  document.title = to.meta.title;
})

export default router;