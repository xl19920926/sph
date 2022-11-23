export default {
    name: 'addCart',
    path: '/addCart',
    component: () => import('@/views/AddCart'),
    meta: {
        title: '添加购物车',
        navIsShow: true
    }
}