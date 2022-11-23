export default {
    name: 'pay',
    path: '/pay',
    component: () => import('@/views/Pay'),
    meta: {
        title: '支付页面',
        navIsShow: true
    }
}