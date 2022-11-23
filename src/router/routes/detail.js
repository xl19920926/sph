export default {
    name: 'detail',
    path: '/detail/:skuid',
    component: () => import('@/views/Detail'),
    meta: {
        title: '商品详情'
    }
}