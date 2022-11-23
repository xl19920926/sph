export default {
    name: 'home',
    path: '/',
    component: () => import('@/views/Home'),
    meta: {
        title: '首页',
        isHome: true
    }
}