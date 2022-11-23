export default {
    name: 'cart',
    path: '/cart',
    component: () => import('@/views/Cart'),
    meta: {
        auth: true,
        title: '购物车',
        navIsShow: true
    }
}