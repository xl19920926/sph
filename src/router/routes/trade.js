export default {
    name: 'trade',
    path: '/trade',
    component: () => import('@/views/Trade'),
    meta: {
        navIsShow: true,
        title: '交易'
    },
    //路由独享守卫(history无法捕获浏览器地址栏from，hash则可以)
    beforeEnter: (to, from, next) => {
      // console.log(from);
      if(from.path == '/cart') {
        next();
      }else {
        next(false);
      }
    }
}