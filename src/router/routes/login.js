export default {
    name: 'login',
    path: '/login',
    component: () => import('@/views/Login'),
    meta: {
        title: '登录',
        auth: true,
        navIsShow: true
    }
}