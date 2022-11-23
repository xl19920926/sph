export default {
  name: 'order',
  path: '/order',
  component: () => import('@/views/Order'),
  meta: {
    title: '我的订单',
    auth: true,
    navIsShow: true
  },
  //子路由
  children: [
    {
      path: '/order',
      redirect: '/order/myorder' 
    },
    {
      path: 'myorder',
      component: () => import('@/views/Order/MyOrder')
    }
  ]
}